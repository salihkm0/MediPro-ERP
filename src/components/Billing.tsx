import React, { useState } from 'react';
import { 
  CreditCard,
  DollarSign,
  Calendar,
  FileText,
  HelpCircle,
  ArrowRight,
  Check,
  AlertCircle,
  Smartphone,
  QrCode,
  Banknote,
  Wallet
} from 'lucide-react';

const BillingPage = () => {
  const [paymentAmount, setPaymentAmount] = useState('49.99');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '4242 4242 4242 4242',
    expiry: '12/25',
    cvc: '123',
    name: 'Sarah Johnson'
  });
  const [upiId, setUpiId] = useState('yourname@upi');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment logic would go here
    setShowPaymentSuccess(true);
    setTimeout(() => setShowPaymentSuccess(false), 3000);
  };

  const billingHistory = [
    { id: 1, date: '2023-11-15', amount: '₹49.99', status: 'Paid', invoice: 'INV-2023-11-001', method: 'Visa' },
    { id: 2, date: '2023-10-15', amount: '₹49.99', status: 'Paid', invoice: 'INV-2023-10-001', method: 'UPI' },
    { id: 3, date: '2023-09-15', amount: '₹49.99', status: 'Paid', invoice: 'INV-2023-09-001', method: 'Razorpay' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Billing & Payments</h1>

      {showPaymentSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <Check className="w-5 h-5 mr-2" />
          Payment successful! Thank you.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Plan */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
              Current Plan
            </h2>
            
            <div className="border border-gray-200 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-semibold text-lg">Professional Plan</h3>
                  <p className="text-gray-500">Monthly subscription</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium mb-2">Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">
                        ✓
                      </span>
                      Unlimited Patients
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">
                        ✓
                      </span>
                      Advanced Analytics
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">
                        ✓
                      </span>
                      Priority Support
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Billing Details</h4>
                  <div className="space-y-2 text-sm">
                    <p>Next billing date: Dec 15, 2023</p>
                    <p>Amount: ₹49.99/month</p>
                    <p>Payment method: Visa •••• 4242</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Upgrade Plan
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Wallet className="w-5 h-5 mr-2 text-blue-600" />
              Payment Methods
            </h2>
            
            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount (₹)</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('card');
                      setShowQRCode(false);
                    }}
                    className={`px-3 py-2 border rounded-lg ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                  >
                    <div className="flex items-center justify-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Card
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('razorpay');
                      setShowQRCode(false);
                    }}
                    className={`px-3 py-2 border rounded-lg ${paymentMethod === 'razorpay' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                  >
                    <div className="flex items-center justify-center">
                      <Banknote className="w-5 h-5 mr-2" />
                      Razorpay
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('upi');
                      setShowQRCode(false);
                    }}
                    className={`px-3 py-2 border rounded-lg ${paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                  >
                    <div className="flex items-center justify-center">
                      <Smartphone className="w-5 h-5 mr-2" />
                      UPI ID
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('qr');
                      setShowQRCode(true);
                    }}
                    className={`px-3 py-2 border rounded-lg ${paymentMethod === 'qr' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                  >
                    <div className="flex items-center justify-center">
                      <QrCode className="w-5 h-5 mr-2" />
                      QR Code
                    </div>
                  </button>
                </div>
              </div>
              
              {paymentMethod === 'card' && (
                <div className="border border-gray-200 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="1234 1234 1234 1234"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Name on card"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input
                        type="text"
                        value={cardDetails.cvc}
                        onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="CVC"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'razorpay' && (
                <div className="border border-gray-200 rounded-xl p-6 mb-6 flex flex-col items-center text-center">
                  <Banknote className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Razorpay Payment Gateway</h3>
                  <p className="text-gray-600 mb-4">
                    You'll be redirected to Razorpay's secure payment page to complete your transaction
                  </p>
                  <div className="flex space-x-2">
                    <img src="https://razorpay.com/build/browser/static/upi.5c0c0e5c.svg" alt="UPI" className="h-8" />
                    <img src="https://razorpay.com/build/browser/static/netbanking.4d09a5d1.svg" alt="Netbanking" className="h-8" />
                    <img src="https://razorpay.com/build/browser/static/cards.8a93b6a4.svg" alt="Cards" className="h-8" />
                    <img src="https://razorpay.com/build/browser/static/wallets.5a7d36f0.svg" alt="Wallets" className="h-8" />
                  </div>
                </div>
              )}
              
              {paymentMethod === 'upi' && (
                <div className="border border-gray-200 rounded-xl p-4 mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="yourname@upi"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Enter your UPI ID to receive payment request</p>
                </div>
              )}
              
              {paymentMethod === 'qr' && (
                <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg border border-gray-300 mb-4">
                    {/* Replace with your actual QR code image */}
                    <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Scan this QR code using any UPI app to complete payment
                  </p>
                  <p className="text-sm font-medium mt-2">Amount: ₹{paymentAmount}</p>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Secure payment processing
                </div>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  {paymentMethod === 'razorpay' ? (
                    'Pay with Razorpay'
                  ) : paymentMethod === 'upi' ? (
                    <>
                      Request Payment <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : paymentMethod === 'qr' ? (
                    'Show QR Code'
                  ) : (
                    <>
                      Pay ₹{paymentAmount} <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Billing History */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Billing History
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {billingHistory.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.method}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.invoice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Payment Support */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
              Payment Support
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Need help with payment?</h3>
                <p className="text-sm text-gray-500 mt-1">Contact our billing support team for assistance.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-sm text-gray-500 mt-1">billing@meditrack.com</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Phone</h3>
                <p className="text-sm text-gray-500 mt-1">+91 98765 43210</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Hours</h3>
                <p className="text-sm text-gray-500 mt-1">Monday-Friday, 9am-5pm IST</p>
              </div>
              
              <button className="w-full mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                Contact Support
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Billing</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Next billing date:</span>
                <span className="font-medium">Dec 15, 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">₹49.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment method:</span>
                <span className="font-medium">Visa •••• 4242</span>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Update Payment Method
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Accepted Payment Methods</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="border rounded-lg p-2 flex items-center justify-center">
                <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8" />
              </div>
              <div className="border rounded-lg p-2 flex items-center justify-center">
                <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-8" />
              </div>
              <div className="border rounded-lg p-2 flex items-center justify-center">
                <img src="https://cdn-icons-png.flaticon.com/512/825/825454.png" alt="UPI" className="h-8" />
              </div>
              <div className="border rounded-lg p-2 flex items-center justify-center">
                <img src="https://razorpay.com/build/browser/static/logo.6a14c675.svg" alt="Razorpay" className="h-6" />
              </div>
              <div className="border rounded-lg p-2 flex items-center justify-center">
                <img src="https://cdn-icons-png.flaticon.com/512/825/825462.png" alt="Paytm" className="h-6" />
              </div>
              <div className="border rounded-lg p-2 flex items-center justify-center">
                <img src="https://cdn-icons-png.flaticon.com/512/2504/2504839.png" alt="Google Pay" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;