import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
//   console.log(user)

  useEffect(() => {
    // Fetch payment history from your backend
    if(user?.email){
        axiosSecure.get(`dashboard/payment-history?email=${user?.email}`)
        .then((res) => setPayments(res.data?.data || []))
        .catch((error) => console.error("Error fetching payments:", error));
    }
//     fetch("/payments")
//       .then((res) => res.json())
//       .then((data) => setPayments(data.data))  // Adjust according to the API response structure
//       .catch((error) => console.error("Error fetching payments:", error));
  }, [user?.email, axiosSecure]);

  return (
        <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Payment History</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-left">Date</th>
              <th className="px-4 py-2 border text-left">Amount</th>
              <th className="px-4 py-2 border text-left">Badge</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td className="px-4 py-2 border">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">${payment.price}</td>
                <td className="px-4 py-2 border">{payment.badge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default PaymentHistory;
