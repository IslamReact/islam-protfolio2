import Container from '@/app/components/layout/container';

const PADS = {
  none: { pt: '0', pb: '0' },
  sm: { pt: '2rem', pb: '2rem' },
  md: { pt: '3.5rem', pb: '3rem' },
  lg: { pt: '6rem', pb: '5rem' },
};

export default function Section({
  id,
  className = '',
  children,
  as: Tag = 'section',
  container = false,
  ariaLabelledby,
  bg = 'none',          // 'none' | 'panel'
  pad = 'md',           // 'none' | 'sm' | 'md' | 'lg'
  style = {},
  ...rest
}) {
  const padVals = PADS[pad] || PADS.md;

  // Fondo opcional (coherente con el look del sitio)
  const bgStyle =
    bg === 'panel'
      ? {
          background: 'rgba(255,255,255,0.02)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }
      : null;

  const outerStyle = {
    paddingTop: padVals.pt,
    paddingBottom: padVals.pb,
    ...bgStyle,
    ...style,
  };

  const content = container ? <Container>{children}</Container> : children;

  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`section ${className}`.trim()}
      style={outerStyle}
      {...rest}
    >
      {content}
    </Tag>
  );
}
