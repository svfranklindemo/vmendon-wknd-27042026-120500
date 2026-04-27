/**
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
  return `${firstname} ${lastname}`.trim();
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}


function calculateEMI(loanAmount, annualInterestRate, loanTenureYears, downPayment) {
  // Calculate the principal loan amount after down payment
  const principal = loanAmount - downPayment;

  // Convert annual interest rate to monthly interest rate
  const monthlyInterestRate = annualInterestRate / (12 * 100);

  // Convert loan tenure from years to months
  const loanTenureMonths = loanTenureYears * 12;

  // Calculate EMI using the formula
  const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenureMonths)) / 
              (Math.pow(1 + monthlyInterestRate, loanTenureMonths) - 1);

  return emi.toFixed(2); // Return EMI rounded to 2 decimal places
}

// Example usage:
const loanAmount = 500000; // Loan amount in currency units
const annualInterestRate = 7.5; // Annual interest rate in percentage
const loanTenureYears = 20; // Loan tenure in years
const downPayment = 50000; // Down payment in currency units

const emi = calculateEMI(loanAmount, annualInterestRate, loanTenureYears, downPayment);
console.log(`Your monthly EMI is: ${emi}`);


// eslint-disable-next-line import/prefer-default-export
export { getFullName, days, calculateEMI };
