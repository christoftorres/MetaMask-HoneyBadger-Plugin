() => (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
      ? 'Recipient has been flagged as a honeypot!'
      : 'Recipient is not a honeypot.',
  })
})

},{}]},{},[1])