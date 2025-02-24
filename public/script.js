document.getElementById('calcForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent form's default submit behavior

  const numA = document.getElementById('numberA').value;
  const numB = document.getElementById('numberB').value;
  const operation = document.getElementById('operation').value;

  // Construct the API URL
  const url = `/api/${operation}?a=${encodeURIComponent(numA)}&b=${encodeURIComponent(numB)}`;
  const spinner = document.getElementById('spinner');
  const btnText = document.getElementById('btnText');
  const resultEl = document.getElementById('result');
  const errorEl = document.getElementById('error');
  const historyEl = document.getElementById('history');

  // Show spinner and update button state
  spinner.classList.remove('d-none');
  btnText.textContent = "Calculating...";
  resultEl.classList.remove('visible');
  errorEl.textContent = '';

  try {
    const response = await fetch(url);
    const data = await response.json();
    spinner.classList.add('d-none');
    btnText.textContent = "Calculate";

    if (!response.ok) {
      resultEl.textContent = '--';
      errorEl.textContent = data.error;
    } else {
      resultEl.textContent = data.result;
      resultEl.classList.add('visible');

      // Add the current calculation to history
      const historyItem = document.createElement('li');
      historyItem.className = 'list-group-item';
      historyItem.textContent = `${numA} ${getOperatorSymbol(operation)} ${numB} = ${data.result}`;
      historyEl.prepend(historyItem);
      errorEl.textContent = '';
    }
  } catch (error) {
    spinner.classList.add('d-none');
    btnText.textContent = "Calculate";
    resultEl.textContent = '--';
    errorEl.textContent = 'An error occurred. Please try again.';
  }
});

// Helper function mapping operation to operator symbol for display
function getOperatorSymbol(operation) {
  switch (operation) {
    case 'add':
      return '+';
    case 'subtract':
      return '-';
    case 'multiply':
      return '×';
    case 'divide':
      return '÷';
    default:
      return operation;
  }
}
