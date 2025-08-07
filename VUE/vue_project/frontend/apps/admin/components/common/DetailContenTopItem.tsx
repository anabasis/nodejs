const DetailContenTopItem = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="item">
      <span className="capH typo500 br pr_8 mr_8">{name}</span>
      <button className="caption navy800" style={{ fontFamily: 'Pretendard, sans-serif' }}>
        {Array.isArray(value) ? value.join(', ') : value}
      </button>
    </div>
  )
}

export default DetailContenTopItem
