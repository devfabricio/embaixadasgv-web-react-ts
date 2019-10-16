import firebase from "firebase";

interface FormattedDate {
    date: string
    weekday: string
    month: string
    month_abbrev: string
    year: number
    hour: string
    min: string
}

const br_weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const br_months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const br_months_abbrev = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function timestampToDate (timestamp: firebase.firestore.Timestamp): FormattedDate {

    let date = timestamp.toDate();

    return {
        date: ("0" + date.getDate()).slice(-2),
        weekday: br_weekdays[date.getDay()],
        month: br_months[date.getMonth()],
        month_abbrev: br_months_abbrev[date.getMonth()],
        year: date.getFullYear(),
        hour: ("0" + date.getHours()).slice(-2),
        min: ("0" + date.getMinutes()).slice(-2),
    }
};