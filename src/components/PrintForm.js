import React, { useState } from 'react';

const PrintForm = ({ setIsFormOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    file: null,
    printColor: 'black',
    copies: 1,
    filePath: '', // To store the file path returned from backend
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showBilling, setShowBilling] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [paymentDone, setPaymentDone] = useState(false);
  const [orderID , setOrderID] = useState('');

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === 'file') {
      const file = files[0];
  
      // Ensure a file is selected
      if (!file) {
        setErrorMessage('Please upload a file.');
        return;
      }
  
      // Upload the file to the server
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);
  
      try {
        const response = await fetch('https://ashprint.onrender.com/upload', {
          method: 'POST',
          body: formDataToSend,
        });
  
        const data = await response.json();
  
        // Store page count and file path
        setPageCount(data.pageCount);
        setFormData({ ...formData, file, filePath: data.filePath }); // Store filePath
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Error uploading the file. Please try again.');
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const calculatePrice = (pages, copies, printColor) => {
    const costPerPage = printColor === 'color' ? 10 : 3;
    return pages * copies * costPerPage;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Ensure file is uploaded
    if (!formData.file) {
      setErrorMessage('Please upload a file before submitting.');
      return;
    }
  
    const price = calculatePrice(pageCount, formData.copies, formData.printColor);
    setTotalPrice(price);
    setShowBilling(true);
  };
  

  const handlePay = async () => {
    try {
      const response = await fetch('https://ashprint.onrender.com/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalPrice }),
      });
  
      const { order_id } = await response.json();
  
      const options = {
        key: 'rzp_test_unOC8OTfw4EaD3',
        amount: totalPrice * 100,
        currency: 'INR',
        name: 'Ashprint',
        description: 'Document Print Service',
        order_id: order_id,
        handler: async (response) => {
          if (response.razorpay_payment_id) {
            const orderDetails = {
              name: formData.name,
              filePath: formData.filePath,
              printColor: formData.printColor,
              copies: formData.copies,
              totalPrice: totalPrice,
              orderId: order_id,
            };
  
            try {
              const saveResponse = await fetch('https://ashprint.onrender.com/create-order-details', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
              });
  
              const result = await saveResponse.json();
              setPaymentDone(true);
  
              // Store order ID for displaying later
              setOrderID(order_id);
            } catch (error) {
              setErrorMessage('Failed to save order details.');
            }
          }
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setErrorMessage('Payment initiation failed. Please try again.');
    }
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
              <p className="text-lg"><strong>Total Price:</strong> ₹{totalPrice}</p>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-300 text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-400 transition duration-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handlePay}
                className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
              >
                Pay Now
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-4xl font-extrabold mb-6 text-center">Payment Successful</h2>
            <p className="text-lg text-center">Thank you for your payment. Your print order has been placed.</p>
            <h1>ORDER ID : {orderID}</h1>
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={handleGoHome}
                className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
              >
                Go Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintForm;
