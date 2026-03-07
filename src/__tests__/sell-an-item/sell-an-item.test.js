import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import * as Provider from '../../ContextProviders/SellAnItemProvider.jsx';
import AuthProvider from '../../ContextProviders/AuthProvider.jsx';
import { getAuthData } from '../../assets/util/Auth.js';
import { fetchWithAuth } from '../../assets/util/FetchRequest.js';
import SellAnItem from '../../pages/SellAnItem.js';

// Mock child components so SellAnItem renders quickly and deterministically
jest.mock('../../components/SellAnItem/Category/Section.jsx', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'stub-category' }, 'Category') };
});
jest.mock('../../components/SellAnItem/ItemName/Section.jsx', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'stub-itemname' }, 'ItemName') };
});
jest.mock('../../components/SellAnItem/ImageUpload/Section.jsx', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'stub-imageupload' }, 'ImageUpload') };
});
jest.mock('../../components/SellAnItem/ItemCondition/Section.jsx', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'stub-itemcondition' }, 'ItemCondition') };
});
jest.mock('../../components/SellAnItem/ItemPrice/Section.jsx', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'stub-itemprice' }, 'ItemPrice') };
});
jest.mock('../../components/SellAnItem/ItemSalePeriod/Section.jsx', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', { 'data-testid': 'stub-itemsaleperiod' }, 'ItemSalePeriod') };
});

// Mock utilities used by the page
jest.mock('../../assets/util/Auth.js', () => ({ getAuthData: jest.fn() }));
jest.mock('../../assets/util/FetchRequest.js', () => ({ fetchWithAuth: jest.fn() }));

// Helper to render SellAnItem with required providers
const renderSellAnItem = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <SellAnItem />
      </AuthProvider>
    </BrowserRouter>
  );
};


describe('SellAnItem Page', () => {
  const baseFormDataPaused = {
    category: { active: false },
    title: { active: false },
    images: { active: false },
    salePeriod: { active: false },
    price: { active: false },
    condition: { active: false, value: { pre: '', post: '', time: { purchaseDuration: '', acquisitionPeriod: '' } } },
    pause: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the first section and navigation buttons', () => {
    jest.spyOn(Provider, 'useFormDataContext').mockReturnValue({
      formData: baseFormDataPaused,
      setFormData: jest.fn(),
    });

    renderSellAnItem();

    expect(screen.getByText(/sell your item/i)).toBeInTheDocument();
    expect(screen.getByTestId('section-counter')).toHaveTextContent('1');

    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toHaveClass('disabled');

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toHaveClass('disabled');
  });

  test('navigates to the next section when Next is clicked and current section active is true', () => {
    const mockSetFormData = jest.fn();
    // category active true, but title (next section) inactive so setFormData may be called to set pause true
    jest.spyOn(Provider, 'useFormDataContext').mockReturnValue({
      formData: {
        ...baseFormDataPaused,
        category: { active: true },
        pause: false,
      },
      setFormData: mockSetFormData,
    });

    renderSellAnItem();

    const nextButton = screen.getByRole('button', { name: /next/i });
    // Next should be enabled because pause is false
    expect(nextButton).not.toHaveClass('disabled');

    fireEvent.click(nextButton);

    // section counter should advance to 2
    expect(screen.getByTestId('section-counter')).toHaveTextContent('2');
    // if next section was not active, component will call setFormData to set pause true
    expect(mockSetFormData).toHaveBeenCalled();
  });

  test('Prev button sets pause to false when clicked', () => {
    const mockSetFormData = jest.fn();
    jest.spyOn(Provider, 'useFormDataContext').mockReturnValue({
      formData: { ...baseFormDataPaused },
      setFormData: mockSetFormData,
    });

    renderSellAnItem();

    const prevButton = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prevButton);

    expect(mockSetFormData).toHaveBeenCalledWith(expect.objectContaining({ pause: false }));
  });

  test('Finish submits when all fields are filled and condition satisfied', () => {
    // prepare fully active formData so Next can be clicked repeatedly to reach last section
    const completeFormData = {
      category: { active: true },
      title: { active: true },
      images: { active: true },
      salePeriod: { active: true },
      price: { active: true },
      condition: {
        active: true,
        value: {
          pre: 'soambo2838',
          post: 'soamao9838',
          time: { purchaseDuration: '3', acquisitionPeriod: 'soamdo8838' },
        },
      },
      pause: false,
    };

    jest.spyOn(Provider, 'useFormDataContext').mockReturnValue({
      formData: completeFormData,
      setFormData: jest.fn(),
    });

    // mock auth and fetch
    getAuthData.mockReturnValue({ token: 'tok', username: 'alice' });

    // stub confirm so handleFinish proceeds
    const realConfirm = window.confirm;
    window.confirm = jest.fn().mockReturnValue(true);

    renderSellAnItem();

    // click Next 5 times to reach section 6 (index 5)
    for (let i = 0; i < 5; i++) {
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);
    }

    const finishButton = screen.getByRole('button', { name: /finish/i });
    expect(finishButton).toBeInTheDocument();

    fireEvent.click(finishButton);

    // fetchWithAuth should be called with the username and formData
    expect(fetchWithAuth).toHaveBeenCalled();
    const [calledUrl] = fetchWithAuth.mock.calls[0];
    expect(calledUrl).toContain('alice');

    // restore confirm
    window.confirm = realConfirm;
  });

  test('Finish shows error when condition fields are missing', async () => {
    const incompleteFormData = {
      ...baseFormDataPaused,
      category: { active: true },
      title: { active: true },
      images: { active: true },
      salePeriod: { active: true },
      price: { active: true },
      condition: {
        active: false,
        value: { pre: '', post: '', time: { purchaseDuration: '', acquisitionPeriod: '' } },
      },
      pause: false,
    };

    jest.spyOn(Provider, 'useFormDataContext').mockReturnValue({
      formData: incompleteFormData,
      setFormData: jest.fn(),
    });

    renderSellAnItem();

    // advance to last section
    for (let i = 0; i < 5; i++) {
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);
    }

    const finishButton = screen.getByRole('button', { name: /finish/i });
    // ensure confirm proceeds so handleFinish runs its validation path
    const realConfirm = window.confirm;
    window.confirm = jest.fn().mockReturnValue(true);

    fireEvent.click(finishButton);

    // wait for the error text to appear
    const err = await screen.findByText(/All fields must be filled/i);
    expect(err).toBeInTheDocument();

    // ensure fetch was not called
    expect(fetchWithAuth).not.toHaveBeenCalled();

    // restore real confirm
    window.confirm = realConfirm;
  });
});