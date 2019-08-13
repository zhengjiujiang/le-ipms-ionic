
export function getDateRange(range: number) {
  const now = new Date();
  const datas = new Array();
  let year = now.getFullYear();
  let month: number | string = now.getDate() < 10 ? now.getMonth() : now.getMonth() + 1;
  for(let i=0; i<range; i++) {
    if(month > 1) {
      (month as number) -= 1;
    } else {
      year--;
      month = 12;
    }
    month = `${ month }`;
    datas.push({
      year: `${ year }`,
      month: (month as string).length < 2 ? `0${ month }` : month,
    });
  }
  return datas;
}
