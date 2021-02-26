function orderHasScreen(orderSummary) {
  return /wf|ws|df|ds/.test(orderSummary);
}

function orderHasCustom(orderSummary) {
  return /wf|ws|df|ds|custom/.test(orderSummary);
}
