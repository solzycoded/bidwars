import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import Section from '../../components/SellAnItem/Category/Section';
import CategoryItem from '../../components/SellAnItem/Category/Item';

// import the entire provider module so we can spy on the hook and get the default provider
import * as SellAnItemProviderModule from '../../ContextProviders/SellAnItemProvider.jsx';

const mockSetFormData = jest.fn();

describe('Category Section', () => {
  const mockCategories = [
    { _id: '1', name: 'Electronics' },
    { _id: '2', name: 'Books' },
    { _id: '3', name: 'Clothing' },
  ];

  const Provider = SellAnItemProviderModule.default;

  beforeEach(() => {
    jest.clearAllMocks();
    // spy on the hook (make it a mock) and return a defined object for each test
    jest.spyOn(SellAnItemProviderModule, 'useFormDataContext').mockReturnValue({
      formData: { category: null },
      setFormData: mockSetFormData,
    });
  });

  afterEach(() => {
    // restore original implementation to avoid cross-test leaks
    if (SellAnItemProviderModule.useFormDataContext.mockRestore) {
      SellAnItemProviderModule.useFormDataContext.mockRestore();
    }
  });

  test('renders all categories as buttons', async () => {
    render(
      <Provider>
        <Section />
      </Provider>
    );
    for (let i = 0; i < mockCategories.length; i++) {
      expect(await screen.findByTestId(`category-option-${i}`)).toBeInTheDocument();
    }
  });

  test('clicking a category updates selection and calls setFormData', async () => {
    render(
      <Provider>
        <Section />
      </Provider>
    );
    const firstButton = await screen.findByTestId('category-option-0');
    fireEvent.click(firstButton);
    expect(mockSetFormData).toHaveBeenCalled();
    expect(firstButton).toHaveClass('selected-category');
  });
});

describe('Category Item', () => {
  test('renders category name', async () => {
    render(<CategoryItem categoryName="Electronics" />);
    expect(await screen.findByText('Electronics')).toBeInTheDocument();
  });
});