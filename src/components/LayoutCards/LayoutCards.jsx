function LayoutCards(props) {
  return (
    <section className={props.className}>
    <h2 className='text-center'>{props.title}</h2>
      {props.children}
  </section>
  )
}

export default LayoutCards;
