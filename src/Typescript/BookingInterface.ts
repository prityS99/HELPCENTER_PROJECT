export interface Appointment {
  id?: string;
  user_id: string;
  patient_name: string;
  counselor_name: string;
  booking_date: string;
  booking_time?: string;
  booking_status?: string;
  amount?: number;
  payment_status?: string;
  payment_method?: string;
  transaction_id?: string;
  created_at?: string;
  email?: string;
  phone?: string;
}


export interface BookingState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}
