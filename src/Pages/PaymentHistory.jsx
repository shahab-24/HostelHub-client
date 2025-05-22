import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`dashboard/payment-history?email=${user?.email}`)
        .then((res) => setPayments(res.data?.data || []))
        .catch((error) => console.error("Error fetching payments:", error));
    }
  }, [user?.email, axiosSecure]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-5xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Payment History
        </h2>

        {payments.length === 0 ? (
          <p className="text-center text-gray-500">No payment history found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-3 text-gray-600 font-semibold border">Date</th>
                  <th className="px-4 py-3 text-gray-600 font-semibold border">Amount</th>
                  <th className="px-4 py-3 text-gray-600 font-semibold border">Badge</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, idx) => (
                  <motion.tr
                    key={payment._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-2 border">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border text-green-600 font-medium">
                      ${payment.price}
                    </td>
                    <td className="px-4 py-2 border">{payment.badge}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentHistory;
