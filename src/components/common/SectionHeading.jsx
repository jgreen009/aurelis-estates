export default function SectionHeading({
  eyebrow,
  title,
  titleAs: Title = 'h2',
  description,
  align = 'left',
  invert = false,
  className = '',
  id,
}) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';
  return (
    <div className={`max-w-prose ${alignment} ${className}`} data-reveal>
      {eyebrow && (
        <p
          className={`label-eyebrow mb-3 ${invert ? 'text-gold' : ''}`}
          id={id ? `${id}-eyebrow` : undefined}
        >
          {eyebrow}
        </p>
      )}
      <Title
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-balance ${
          invert ? 'text-ivory' : 'text-charcoal'
        }`}
      >
        {title}
      </Title>
      {description && (
        <p
          className={`mt-4 text-base lg:text-lg leading-relaxed text-pretty ${
            invert ? 'text-ivory/80' : 'text-charcoal/70'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
