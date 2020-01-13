function honeybadgerAuditApi(address) {
  return new Promise(resolve => {
    fetch('https://honeybadger.uni.lu/api/v1.0/audit/'+address)
    .then((response) => {
      return response.json();
    }).then((result) => {
      if (result.balance_disorder ||
          result.hidden_state_update  || 
          result.hidden_transfer ||
          result.inheritance_disorder ||
          result.skip_empty_string_literal ||
          result.straw_man_contract  || 
          result.type_deduction_overflow ||
          result.uninitialised_struct) {
            resolve(true);
      }
      resolve(false);
    }).catch(error => {
      resolve(false);
    });
  })
}

wallet.onMetaMaskEvent('newUnapprovedTx', async (txMeta) => {
  const {txParams} = txMeta
  const addressIsHoneypot= await honeybadgerAuditApi(txParams.to)
  wallet.addAddressAudit({
    address: txParams.to,
    auditor: 'HoneyBadger Auditor',
    status: addressIsHoneypot ? 'warning' : 'approval',
    message: addressIsHoneypot
      ? 'Recipient is a honeypot!'
      : 'Recipient is not a honeypot.',
  })
})
