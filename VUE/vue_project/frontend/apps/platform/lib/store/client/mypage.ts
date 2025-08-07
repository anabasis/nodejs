export const findUserEmailCorp = (email: string) => {
  const atIndex = email?.indexOf('@')
  if (atIndex !== -1) {
    const dotIndex = email?.indexOf('.', atIndex)
    if (dotIndex !== -1) {
      const corpname = email?.slice(atIndex + 1, dotIndex)
      return corpname //megazone.syyang@seegene.com -> seegene
    }
  }
  return null
}
