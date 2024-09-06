import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack';

const PrintForm = ({ setIsFormOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    file: null,
    printColor: 'black',
    copies: 1,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showBilling, setShowBilling] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pageCount, setPageCount] = useState(0); 
  const [paymentDone, setPaymentDone] = useState(false);

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];

      if (!file || !file.name.endsWith('.pdf')) {
        setErrorMessage('Only PDF files are allowed.');
        return;
      }

      try {
        const pageCount = await getPageCount(file);
        if (pageCount === 0) {
          setErrorMessage('The file is corrupted. Please upload another file.');
          return;
        }
        setPageCount(pageCount); 
        setErrorMessage(''); 
      } catch (error) {
        setErrorMessage('Error reading the PDF file. Please try again.');
        return;
      }

      setFormData({ ...formData, file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const getPageCount = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async function (e) {
        const arrayBuffer = e.target.result;
        try {
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          resolve(pdf.numPages); 
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = function () {
        reject(new Error('Error reading file'));
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const calculatePrice = (pages, copies, printColor) => {
    const costPerPage = printColor === 'color' ? 10 : 3;
    return pages * copies * costPerPage;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.file || pageCount === 0) {
      setErrorMessage('Please upload a valid PDF file.');
      return;
    }

    const price = calculatePrice(pageCount, formData.copies, formData.printColor);
    setTotalPrice(price);
    setShowBilling(true);
  };

  const handlePay = () => {
    setPaymentDone(true);
  };

  const handleBack = () => {
    setShowBilling(false); 
  };

  const handleGoHome = () => {
    setIsFormOpen(false); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-lg w-full max-w-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        {!showBilling ? (
          <>
            <h2 className="text-4xl font-extrabold mb-8 text-center">Print Your Document</h2>
            {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-lg font-medium mb-2" htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-black transition duration-300"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2" htmlFor="file">Upload File (PDF only)</label>
                <input
                  id="file"
                  type="file"
                  name="file"
                  accept=".pdf"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-black transition duration-300"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">Print Color</label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="printColor"
                      value="black"
                      checked={formData.printColor === 'black'}
                      onChange={handleChange}
                      className="form-radio text-black"
                    />
                    <span className="ml-2">Black</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="printColor"
                      value="color"
                      checked={formData.printColor === 'color'}
                      onChange={handleChange}
                      className="form-radio text-black"
                    />
                    <span className="ml-2">Color</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2" htmlFor="copies">Number of Copies</label>
                <input
                  id="copies"
                  type="number"
                  name="copies"
                  value={formData.copies}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-black transition duration-300"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : !paymentDone ? (
          <div>
            <h2 className="text-4xl font-extrabold mb-6 text-center">Billing Summary</h2>
            <div className="space-y-4">
              <p className="text-lg"><strong>Name:</strong> {formData.name}</p>
              <p className="text-lg"><strong>File:</strong> {formData.file.name}</p>
              <p className="text-lg"><strong>Pages:</strong> {pageCount}</p>
              <p className="text-lg"><strong>Color:</strong> {formData.printColor === 'black' ? 'Black' : 'Color'}</p>
              <p className="text-lg"><strong>Number of Copies:</strong> {formData.copies}</p>
              <p className="text-lg"><strong>Total Price:</strong> ${totalPrice}</p>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="bg-white text-black px-6 py-3 rounded-full border border-black font-semibold hover:bg-gray-100 transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handlePay}
                className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
              >
                Pay
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-4xl font-extrabold mb-6 text-center">Payment Confirmation</h2>
            <p className="text-lg text-center mb-4">Payment completed successfully! Your prints will be processed soon.</p>
            <button
              onClick={handleGoHome}
              className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
            >
              Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintForm;
