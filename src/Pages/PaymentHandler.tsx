import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// Define the shape of the global Razorpay object
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentHandlerProps {
  amount: number;
  patientName: string;
  counselor: string;
  onSuccess: (paymentResponse: any) => void;
  onFailure?: (error: any) => void;
  open: boolean;
  onClose: () => void;
}

const PaymentHandler: React.FC<PaymentHandlerProps> = ({
  open,
  amount,
  patientName,
  counselor,
  onSuccess,
  onFailure,
  onClose,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Prevent execution if not open or already processing
    if (open && !isProcessing) {
      setIsProcessing(true); // Set processing to prevent multiple calls
      startPayment();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // --- Step 1: Dynamic Razorpay Script Loader ---
  const loadRazorpay = () => {
    return new Promise<boolean>((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // --- Step 2 (CRITICAL): Fetch Server-Side Order ID ---
  const fetchOrderId = async (orderAmount: number) => {
    // ⚠️ IMPLEMENT THIS SECURELY ON YOUR BACKEND! ⚠️
    // Your backend must call the Razorpay API to create an order
    try {
      const response = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: orderAmount * 100, currency: "INR" }),
      });
      const data = await response.json();
      
      if (!response.ok || !data.orderId) {
          throw new Error(data.message || "Failed to create order on server.");
      }
      
      return data.orderId;
    } catch (error) {
      console.error("Order creation error:", error);
      throw new Error("Could not initialize payment.");
    }
  };
  
  // --- Step 3: Initialize and Open Payment Modal ---
  const startPayment = async () => {
    try {
      // 1. Load the script
      const scriptLoaded = await loadRazorpay();
      if (!scriptLoaded) {
        throw new Error("Razorpay SDK failed to load.");
      }

      // 2. Fetch the secure Order ID
      const orderId = await fetchOrderId(amount);
      
      // 3. Define Payment Options
      const options = {
        key: "rzp_test_YourKeyHere", // Replace with your Public Key
        amount: amount * 100, // Amount in paise
        currency: "INR",
        order_id: orderId, // Pass the server-generated Order ID (REQUIRED)
        name: "MindEase Counseling",
        description: `Appointment with ${counselor}`,
        
        // Success Handler
        handler: (response: any) => {
          setIsProcessing(false);
          onSuccess(response);
          onClose();
        },
        
        prefill: {
          name: patientName,
          // Replace with actual user data if available
          email: "user@example.com", 
          contact: "9999999999", 
        },
        notes: { counselor_name: counselor },
        theme: { color: "#678e0b" },
      };

      // 4. Open Payment Modal
      const paymentObject = new window.Razorpay(options);

      // Handle failed payment events before opening
      paymentObject.on("payment.failed", (response: any) => {
        setIsProcessing(false);
        toast.error("Payment failed. Please try again.");
        onFailure?.(response);
        onClose();
      });

      paymentObject.open();

    } catch (error) {
      // Catch errors from script loading or order fetching
      setIsProcessing(false);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast.error(errorMessage);
      onFailure?.(error);
      onClose(); // Close the handler
    }
  };

  return null; // This component handles logic and UI is the Razorpay modal
};

export default PaymentHandler;