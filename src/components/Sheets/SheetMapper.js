export default class SheetMapper {
  static idsToSheets(idList, sheetList) {
    return sheetList.filter((sheet) => idList.includes(sheet.id));
  }
}
