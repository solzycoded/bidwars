import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SelectTimeOption from '../../../components/SellAnItem/ItemCondition/SelectTimeOption.jsx';

// mock fetchNoAuth to avoid any network side-effects (module referenced by the component)
jest.mock('../../../assets/util/FetchRequest.js', () => ({
  fetchNoAuth: jest.fn(),
}));

describe('SelectTimeOption', () => {
  test('renders five timeframe options with correct text and values', async () => {
    render(
      // wrap the options in a select so they are valid DOM children
      <select>
        <SelectTimeOption />
      </select>
    );

    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(5);

    const expected = [
      { id: 'soamao9838', name: 'hour(s)' },
      { id: 'soambo2838', name: 'day(s)' },
      { id: 'soamco1138', name: 'week(s)' },
      { id: 'soamdo8838', name: 'month(s)' },
      { id: 'soameo2838', name: 'year(s)' },
    ];

    expected.forEach((exp, i) => {
      expect(options[i]).toHaveTextContent(exp.name);
      expect(options[i]).toHaveValue(exp.id);
    });
  });
});