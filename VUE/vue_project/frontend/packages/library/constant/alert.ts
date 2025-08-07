export type InfoAlertType = 'cancel' | 'writing' | 'delete' | 'stop'

type InfoStateType = {
  title: string
  textTitle: string
}

const cancelInfo = `Entered or changed information will not be saved.`

const writingInfo = `The contents you wrote will disappear and will not be registered.`

const DeleteInfo = 'If you click the delete button, it cannot be recovered.'

const stopInfo = 'If you click the stop button, the current module will be stopped.'

const infoType: { [key in string]: InfoStateType } = {
  cancel: {
    title: 'Do you want to cancel?',
    textTitle: cancelInfo,
  },
  writing: {
    title: 'Do you want to cancel writing?',
    textTitle: writingInfo,
  },
  delete: {
    title: 'Are you sure to delete?',
    textTitle: DeleteInfo,
  },
  stop: {
    title: 'Are you sure to stop the module?',
    textTitle: stopInfo,
  },
}

const getInfoAlertState = ({ title, textTitle }: InfoStateType) => {
  return {
    title,
    textTitle,
  }
}

export const getInfoRender = (type: InfoAlertType) => getInfoAlertState(infoType[type])
