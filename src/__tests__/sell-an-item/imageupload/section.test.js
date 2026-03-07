import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ImageUploadSection from '../../../components/SellAnItem/ImageUpload/Section.jsx';

// mock the Item child so Section tests only its own behavior/structure
jest.mock('../../../components/SellAnItem/ImageUpload/Item.jsx', () => {
  return {
    __esModule: true,
    default: ({ tag }) => <div data-testid={`stub-image-item-${tag}`}>item-{tag}</div>,
  };
});

describe('ImageUpload Section (unit) - isolated from Item implementation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders one child stub per entry in formData.images.value', async () => {
    const initialFormData = {
      images: { value: [null, null, null], active: false },
      pause: true,
    };
    const setFormData = jest.fn();

    render(<ImageUploadSection formData={initialFormData} setFormData={setFormData} />);

    const items = await screen.findAllByTestId(/stub-image-item-/);
    expect(items).toHaveLength(initialFormData.images.value.length);
    // ensure tags are passed in order
    expect(screen.getByTestId('stub-image-item-0')).toBeInTheDocument();
    expect(screen.getByTestId('stub-image-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('stub-image-item-2')).toBeInTheDocument();
  });

  test('respects different images array lengths rendered as child stubs', async () => {
    const initialFormData = {
      images: { value: [null], active: false },
      pause: true,
    };
    const setFormData = jest.fn();

    render(<ImageUploadSection formData={initialFormData} setFormData={setFormData} />);

    const items = await screen.findAllByTestId(/stub-image-item-/);
    expect(items).toHaveLength(3);
    expect(screen.getByTestId('stub-image-item-0')).toBeInTheDocument();
  });
});