type Props = {
  htmlString: string
}
export default function HtmlRender({ htmlString }: Props) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />
}
