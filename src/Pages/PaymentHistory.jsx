import React, { useEffect, useState } from "react";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const {user} = useAuth()
  clg

  useEffect(() => {
    // Fetch payment history from your backend
    fetch("/payments")
      .then((response) => response.json())
      .then((data) => setPayments(data.data))  // Adjust according to the API response structure
      .catch((error) => console.error("Error fetching payments:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border text-left">Date</th>
            <th className="px-4 py-2 border text-left">Amount</th>
            <th className="px-4 py-2 border text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="px-4 py-2 border">{new Date(payment.created * 1000).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{payment.amount / 100}</td>
              <td className="px-4 py-2 border">{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
