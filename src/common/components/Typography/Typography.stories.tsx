import type { Meta } from '@storybook/react';
import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// Headings
export const H1 = () => (
  <Typography variant="h1">
    This is an H1 Heading
  </Typography>
);

export const H2 = () => (
  <Typography variant="h2">
    This is an H2 Heading
  </Typography>
);

export const H3 = () => (
  <Typography variant="h3">
    This is an H3 Heading
  </Typography>
);

export const H4 = () => (
  <Typography variant="h4">
    This is an H4 Heading
  </Typography>
);

export const H5 = () => (
  <Typography variant="h5">
    This is an H5 Heading
  </Typography>
);

export const H6 = () => (
  <Typography variant="h6">
    This is an H6 Heading
  </Typography>
);

// Subtitles
export const Subtitle1 = () => (
  <Typography variant="subtitle1">
    This is a Subtitle 1 - Used as primary subtitle
  </Typography>
);

export const Subtitle2 = () => (
  <Typography variant="subtitle2">
    This is a Subtitle 2 - Used as secondary subtitle
  </Typography>
);

// Body text
export const Body1 = () => (
  <Typography variant="body1">
    This is body1 text. It's the standard paragraph text used throughout the application. 
    It provides good readability with appropriate font size and line height for longer content. 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Typography>
);

export const Body2 = () => (
  <Typography variant="body2">
    This is body2 text. It's a smaller variant of body text, useful for supplementary content 
    or compact layouts. It maintains readability while taking up less space.
  </Typography>
);

// Caption and overline
export const Caption = () => (
  <Typography variant="caption">
    This is caption text - typically used for small, secondary information
  </Typography>
);

export const Overline = () => (
  <Typography variant="overline">
    This is overline text
  </Typography>
);

// Button text
export const ButtonText = () => (
  <Typography variant="button">
    Button Text
  </Typography>
);

// All variants together
export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
    <Typography variant="h1">H1 Heading - Page Title</Typography>
    <Typography variant="h2">H2 Heading - Section Title</Typography>
    <Typography variant="h3">H3 Heading - Subsection Title</Typography>
    <Typography variant="h4">H4 Heading - Minor Section</Typography>
    <Typography variant="h5">H5 Heading - Details Heading</Typography>
    <Typography variant="h6">H6 Heading - Small Heading</Typography>
    <Typography variant="subtitle1">Subtitle 1 - Primary Subtitle</Typography>
    <Typography variant="subtitle2">Subtitle 2 - Secondary Subtitle</Typography>
    <Typography variant="body1">
      Body 1 Text - This is the standard paragraph text used for main content. 
      It provides good readability and is suitable for longer passages.
    </Typography>
    <Typography variant="body2">
      Body 2 Text - Smaller paragraph text for secondary content.
    </Typography>
    <Typography variant="caption">Caption - Small, supplementary text</Typography>
    <Typography variant="overline">OVERLINE - UPPERCASE LABEL</Typography>
    <Typography variant="button">BUTTON TEXT</Typography>
  </div>
);

// With styling
export const WithCustomStyling = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
    <Typography 
      variant="h2"
      style={{ color: 'var(--color-primary)' }}
    >
      Styled Heading in Primary Color
    </Typography>
    <Typography 
      variant="body1"
      style={{ 
        color: 'var(--color-success)',
        fontStyle: 'italic'
      }}
    >
      Body text with custom color and italic style
    </Typography>
  </div>
);

// Accessibility features
export const WithAccessibility = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
    <Typography 
      variant="h2"
      aria-label="Main section heading"
    >
      Heading with ARIA Label
    </Typography>
    <Typography 
      variant="body1"
      aria-describedby="description"
    >
      This text has additional description
    </Typography>
    <Typography 
      variant="caption"
      id="description"
      aria-hidden={true}
    >
      Additional description for assistive technologies
    </Typography>
  </div>
);

// Different content scenarios
export const ArticleLayout = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '800px' }}>
    <Typography variant="overline">Featured Article</Typography>
    <Typography variant="h1">Understanding Design Systems</Typography>
    <Typography variant="subtitle1">A comprehensive guide to building scalable UI systems</Typography>
    <Typography variant="body1">
      Design systems are a set of standards to manage design at scale by reducing redundancy while creating a shared language 
      and visual consistency across different pages and channels. They help teams to be more efficient and organized when building 
      products that need to remain visually and functionally consistent.
    </Typography>
    <Typography variant="h3">Key Benefits</Typography>
    <Typography variant="body2">
      Design systems provide numerous advantages including improved consistency, faster design and development, better collaboration, 
      and easier maintenance of design patterns.
    </Typography>
  </div>
);

// Semantic HTML test
export const SemanticMarkup = () => (
  <article style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
    <Typography variant="h1">Article Title (h1)</Typography>
    <Typography variant="body1">
      First paragraph of article content. This should use semantic h1 tag for page structure.
    </Typography>
    
    <section>
      <Typography variant="h2">Section Heading (h2)</Typography>
      <Typography variant="body1">
        Subsection content here. Heading hierarchy is important for accessibility.
      </Typography>
      
      <Typography variant="h3">Subsection (h3)</Typography>
      <Typography variant="body2">
        Even smaller heading with body2 text content.
      </Typography>
    </section>
  </article>
);

// Responsive text
export const ResponsiveExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
    <Typography variant="h1" className="text-2xl md:text-4xl">
      Responsive Heading - Adapts to screen size
    </Typography>
    <Typography variant="body1">
      Combined with className prop for additional responsive styles if needed
    </Typography>
  </div>
);

// Live region example
export const LiveRegion = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
    <Typography variant="h3">Status Updates</Typography>
    <Typography 
      variant="body2"
      aria-live="polite"
      aria-label="Status message"
    >
      ✓ Operation completed successfully
    </Typography>
  </div>
);
