const List = ({ data, loginUserInfo  }) => {

  const formattedDate = new Date(data.newDate).toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환

  return (
    <a href="" className='list'>
      <span className="date">
        {formattedDate}
      </span>
      <div className="thumbnail">
        <img src={data.image} alt="썸네일"/>
      </div>
      <div className='top'>
        {loginUserInfo ? loginUserInfo.id : '로그인 필요'}
        <div>{data.title}</div>
      </div>
      <div className="content">
        {data.info}
      </div>
    </a>
  )
}

export default List