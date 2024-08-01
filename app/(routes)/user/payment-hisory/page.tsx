//* Compoonents
import React from "react";
import UserLayout from "../user-layout";
import Link from "next/link";

//* Icons
import PaymentIcon from "@/icons/payment.png";

const PaymentHistory = () => {
  return (
    <UserLayout pageIcon={PaymentIcon} pageTitle="Payment History">
      <section className="user-payment-history-section">
        <div className="user-payment-history-container">
          <div className="table-responsive">
            <table className="user-payment-table">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Date</th>
                  <th>Mode of Payment</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Invouces</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>NBL012345</td>
                  <td>20-03-2023</td>
                  <td>Debit Card</td>
                  <td>Done</td>
                  <td>27$</td>
                  <td>
                    <Link href="downliad-invoice" download>
                      Download
                    </Link>
                  </td>
                </tr>

                <tr>
                  <td>NBL012345</td>
                  <td>20-03-2023</td>
                  <td>Debit Card</td>
                  <td>Done</td>
                  <td>27$</td>
                  <td>
                    <Link href="downliad-invoice" download>
                      Download
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default PaymentHistory;
