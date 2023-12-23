/**
 * @function changeAccount
 * @description Change the account displayed in the balance section.
 */
export function changeAccount() {
    const account = document.getElementById("account").value;
    const balance = document.getElementById("balance");

    const budget = document.getElementById("budget").textContent.split(", ");

    if (account == "bank") {
        balance.innerHTML = "Solde actuel : {budget} €".replace("{budget}", budget[0]);
    } else {
        balance.innerHTML = "Solde actuel : {budget} €".replace("{budget}", budget[1]);
    }
}