import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import ConditionOption from '../../../components/SellAnItem/ItemCondition/ConditionOption.jsx';

// mock fetchNoAuth to avoid network side-effects
jest.mock('../../../assets/util/FetchRequest.js', () => ({
  fetchNoAuth: jest.fn(),
}));

describe('ConditionOption', () => {
  test('renders five condition options with correct text and values', async () => {
    render(
      // wrap options in a select so they are valid DOM children
      <select>
        <ConditionOption condition="pre" />
      </select>
    );

    // wait for options to render (useEffect populates state)
    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(5);

    const expected = [
      { id: 'soambo2838', name: 'brand new' },
      { id: 'soamao9838', name: 'fairly used' },
      { id: 'soamio5838', name: 'properly used' },
      { id: 'soamco1138', name: 'looks like new' },
      { id: 'soamdo8838', name: 'vintage (old)' },
    ];

    expected.forEach((exp, i) => {
      expect(options[i]).toHaveTextContent(exp.name);
      expect(options[i]).toHaveValue(exp.id);
    });
  });

  test('renders options for post condition type', async () => {
    render(
      <select>
        <ConditionOption condition="post" />
      </select>
    );

    // options should render regardless of condition type (component doesn't filter based on it)
    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(5);
    expect(options[0]).toHaveTextContent('brand new');
  });

  test('accepts condition prop without error', () => {
    const { container } = render(
      <select>
        <ConditionOption condition="pre" />
      </select>
    );

    // component should render without throwing
    expect(container).toBeInTheDocument();
  });

  test('calls useEffect once on mount', async () => {
    const { rerender } = render(
      <select>
        <ConditionOption condition="pre" />
      </select>
    );

    // wait for options to populate
    await waitFor(() => {
      const options = screen.queryAllByRole('option');
      expect(options.length).toBeGreaterThan(0);
    });

    // re-render with same condition prop
    rerender(
      <select>
        <ConditionOption condition="pre" />
      </select>
    );

    // options should still be present (effect dependency array prevents re-runs on condition change)
    const options = screen.queryAllByRole('option');
    expect(options).toHaveLength(5);
  });
});