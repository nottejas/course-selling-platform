import Link from 'next/link';

// Define the expected props for the Button component
interface ButtonProps {
  children: React.ReactNode; // Content of the button
  className?: string; // Additional CSS classes
  isLink?: boolean; // Indicates if it's a link
  href?: string; // URL for links
  color?: 'blue' | 'green' | 'yellow' | 'red'; // Button color
  variant?: 'solid' | 'outline' | 'ghost'; // Button style
}

// Function to concatenate CSS classes
const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

// Define CSS class strings for different button styles and colors
const solidBlue =
  'bg-blue-400 hover:bg-blue-500 focus-visible:outline-blue-400';

const outlineBlue =
  'bg-blue-400/10 border border-blue-400 focus-visible:outline-blue-400 hover:bg-blue-400/20';

const ghostBlue = 'focus-visible:outline-blue-400 hover:bg-blue-400/20';

// Button component
const Button = (props: ButtonProps) => {
  const { isLink = false, color = 'blue', variant = 'solid' } = props;

  // Calculate the final className for the button
  const className = classNames(
    // Common button styles
    'rounded-md px-3.5 py-1.5 text-gray-300 hover:text-white font-semibold leading-7 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    // Apply specific styles based on color and variant
    color === 'blue' && variant === 'solid' ? solidBlue : '',
    color === 'blue' && variant === 'outline' ? outlineBlue : '',
    color === 'blue' && variant === 'ghost' ? ghostBlue : ''
  );

  return (
    <>
      {isLink ? (
        // If it's a link, render a Link component
        <Link className={className} href={`${props?.href}`}>
          {props.children}
        </Link>
      ) : (
        // If it's not a link, render a button element
        <button className={className}>{props.children}</button>
      )}
    </>
  );
};

export default Button;

// function EditActiveIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M4 13V16H7L16 7L13 4L4 13Z"
//         fill="none"
//         className="stroke-red-400"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// }
