import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageUploadItem from '../../../components/SellAnItem/ImageUpload/Item.jsx';

// import the provider module object so we can spy on its hook
import * as SellAnItemProvider from '../../../ContextProviders/SellAnItemProvider.jsx';

const mockSetFormData = jest.fn();
const initialFormData = { images: { value: [null, null, null], active: false }, pause: true };

describe('ImageUpload Item', () => {
  const createFile = (name = 'photo.png', type = 'image/png') => new File(['dummy'], name, { type });

  let OriginalFileReader;

  beforeAll(() => {
    OriginalFileReader = window.FileReader;
  });

  afterAll(() => {
    window.FileReader = OriginalFileReader;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // spy on the hook and return a defined object before rendering the component
    jest.spyOn(SellAnItemProvider, 'useFormDataContext').mockReturnValue({
      formData: initialFormData,
      setFormData: mockSetFormData,
    });
  });

  test('renders input and preview, and handles file selection', async () => {
    // mock FileReader to synchronously call onload with a data URL
    class MockFileReader {
      readAsDataURL() {
        if (this.onload) {
          this.onload({ target: { result: 'data:image/png;base64,TESTDATA' } });
        }
      }
    }
    window.FileReader = MockFileReader;

    render(<ImageUploadItem tag={0} />);

    const nativeInput = await screen.findByTestId('image-upload-native-0');
    expect(nativeInput).toBeInTheDocument();

    const preview = screen.getByTestId('image-preview-0');
    expect(preview).toBeInTheDocument();

    const file = createFile('test.png');
    fireEvent.change(nativeInput, { target: { files: [file] } });

    await waitFor(() => expect(mockSetFormData).toHaveBeenCalled());

    expect(preview).toHaveAttribute('src', expect.stringContaining('data:image/png;base64,TESTDATA'));
  });
});