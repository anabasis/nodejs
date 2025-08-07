import { ITool, IToolArchiPostData, IToolPostFormat, IToolSearchParam } from '@type/tools/toolType'

export const pageTitle = {
  main: ['Tools'],
  add: ['Tools', 'Add Tools'],
  edit: ['Tools', 'Tool Detail', 'Edit Tools'],
  detail: ['Tools', 'Tool Detail'],
  manage: ['Tools', 'Tool Management'],
}

export const initialFilterParam: IToolSearchParam = {
  keyword: '',
  startDate: '',
  endDate: '',
  keywordTab: '',
  displayStartDate: '',
  displayEndDate: '',
}

export const selectBoxOptions = [
  {
    name: 'Name',
    value: 'TOOL_NAME',
  },
]

export const initialToolData: ITool = {
  toolNum: 0,
  toolName: '',
  toolOrder: 0,
  toolDescription: '',
  toolExposure: 'PUB',
  toolExposureCorp: [],
  toolUrl: '',
  toolRegisterDate: '',
  fileInfoResponse: {
    fileNumber: 0,
    fileName: '',
    displayFileName: '',
    fileExtension: '',
    filePath: '',
    fileSize: 0,
    storageTypeCode: '',
    tableName: '',
  },
}

export const initialToolPostData: IToolPostFormat = {
  toolName: '',
  toolDescription: '',
  toolExposure: 'PUB',
  toolExposureCorporate: [],
  toolUrl: '',
  toolFileNum: -1,
}
