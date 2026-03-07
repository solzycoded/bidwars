import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ItemCondition from '../../../components/SellAnItem/ItemCondition/Section.jsx';

// Mock child components so tests isolate Section behavior
jest.mock('../../../components/SellAnItem/ItemCondition/SelectTime.jsx', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: () => React.createElement('div', { 'data-testid': 'stub-select-time' }, 'SelectTime'),
  };
});

jest.mock('../../../components/SellAnItem/ItemCondition/Condition.jsx', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ conditionType }) =>
      React.createElement('div', { 'data-testid': `stub-condition-${conditionType}` }, `Condition ${conditionType}`),
  };
});

describe('ItemCondition Section', () => {
  test('renders section with correct heading', () => {
    render(<ItemCondition />);

    // get heading and then find the parent section (section has no accessible name)
    const heading = screen.getByRole('heading', { level: 5 });
    expect(heading).toHaveTextContent('Condition of Item');

    const section = heading.closest('section');
    expect(section).toHaveAttribute('id', 'item-condition');
    expect(section).toHaveClass('sell-your-item-section');
  });

  test('renders SelectTime child component', () => {
    render(<ItemCondition />);

    const selectTime = screen.getByTestId('stub-select-time');
    expect(selectTime).toBeInTheDocument();
  });

  test('renders two Condition components with pre and post types', () => {
    render(<ItemCondition />);

    const preCondition = screen.getByTestId('stub-condition-pre');
    const postCondition = screen.getByTestId('stub-condition-post');

    expect(preCondition).toBeInTheDocument();
    expect(postCondition).toBeInTheDocument();
  });

  test('renders all three child components in correct order', () => {
    render(<ItemCondition />);

    const selectTime = screen.getByTestId('stub-select-time');
    const preCondition = screen.getByTestId('stub-condition-pre');
    const postCondition = screen.getByTestId('stub-condition-post');

    // verify elements exist
    expect(selectTime).toBeInTheDocument();
    expect(preCondition).toBeInTheDocument();
    expect(postCondition).toBeInTheDocument();

    // find the section via the heading and inspect stub children order
    const container = screen.getByRole('heading', { level: 5 }).closest('section');
    const children = Array.from(container.querySelectorAll('[data-testid^="stub-"]'));
    expect(children[0]).toHaveAttribute('data-testid', 'stub-select-time');
    expect(children[1]).toHaveAttribute('data-testid', 'stub-condition-pre');
    expect(children[2]).toHaveAttribute('data-testid', 'stub-condition-post');
  });

  test('uses container-fluid and proper Bootstrap classes', () => {
    render(<ItemCondition />);

    // query the section by locating the heading and using closest('section')
    const section = screen.getByRole('heading', { level: 5 }).closest('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'item-condition');

    const containerFluid = section.querySelector('.container-fluid');
    expect(containerFluid).toBeInTheDocument();
    expect(containerFluid).toHaveClass('p-0');

    const textStart = containerFluid.querySelector('.text-start');
    expect(textStart).toHaveClass('mb-4');
  });
});