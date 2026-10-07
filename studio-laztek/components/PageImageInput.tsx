import type {ObjectInputProps, ImageValue} from 'sanity'

export function PageImageInput(props: ObjectInputProps<ImageValue>) {
  const options = props.schemaType.options as {defaultPreview?: string} | undefined
  const preview = (props.value as {localPreview?: string} | undefined)?.localPreview || options?.defaultPreview
  return <div>
    {!props.value?.asset && preview && <figure style={{margin: '0 0 12px'}}>
      <img src={preview} alt="Trenutna fotografija na spletni strani" style={{display: 'block', maxHeight: 200, maxWidth: '100%', borderRadius: 6}} />
      <figcaption style={{fontSize: 12, opacity: 0.75, marginTop: 8}}>Trenutna fotografija. Za zamenjavo naloži novo spodaj.</figcaption>
    </figure>}
    {props.renderDefault(props)}
  </div>
}
