export const styledDate = (date) => {
    const thisDate = new Date(date);
    const styledDay = thisDate.getDate() < 10 ? '0' + thisDate.getDate() : thisDate.getDate();
    const styledMonth = thisDate.getMonth() < 10 ? '0' + (thisDate.getMonth() + 1) : (thisDate.getMonth() + 1);
    const styledYear = thisDate.getFullYear();
    return styledYear + '-' + styledMonth + '-' + styledDay;
}