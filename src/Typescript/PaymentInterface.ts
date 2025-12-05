export interface Payment {
  id?: string;                                  
  booking_id: string;                           
  amount: number;                               
  payment_status: "pending" | "success" | "failed"; 
  payment_method?: string;                      
  transaction_id?: string;                      
  order_id?: string;                            
  created_at?: string;                           
}

export interface PaymentState {
  payments: Payment[];       
  loading: boolean;         
  error: string | null;      
}
