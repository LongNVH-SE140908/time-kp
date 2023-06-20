export interface Timekeeping {
  employee_id: number
  user_name: string
  clock_time: ClockTime[]
}

export interface ClockTime {
  date: string
  clock_type: ClockType
}

export interface ClockType {
  emp: Emp
  guard: Guard
}

export interface Emp {
  "6AM_to_12PM": N6AmTo12Pm
  "12PM_to_18PM": N12PmTo18Pm
  "18PM_to_12AM": N18PmTo12Am
  "12AM_to_6AM": N12AmTo6Am
}

export interface N6AmTo12Pm {
  clock_time_check_in: string
  clock_time_check_out: string
  total_minute: string
  rate: number
  isValid: number
}

export interface N12PmTo18Pm {
  clock_time_check_in: string
  clock_time_check_out: string
  total_minute: string
  rate: number
  isValid: number
}

export interface N18PmTo12Am {
  clock_time_check_in: string
  clock_time_check_out: string
  total_minute: string
  rate: number
  isValid: number
}

export interface N12AmTo6Am {
  clock_time_check_in: string
  clock_time_check_out: string
  total_minute: string
  rate: number
  isValid: number
}

export interface Guard {
  "6AM_to_18PM": N6AmTo18Pm
  "18PM_to_12AM": N18PmTo12Am2
  "12AM_to_6AM": N12AmTo6Am2
}

export interface N6AmTo18Pm {
  clock_time_check_in: string
  clock_time_check_out: string
  total_minute: string
  rate: number
  isValid: number
}

export interface N18PmTo12Am2 {
  clock_time_check_in: string
  clock_time_check_out: string
  total_minute: string
  rate: number
  isValid: number
}

export interface N12AmTo6Am2 {
  clock_time_check_in: string
  clock_time_check_out: string
  total_minute: string
  rate: number
  isValid: number
}
