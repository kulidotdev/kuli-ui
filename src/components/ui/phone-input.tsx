import * as React from "react";
import PhoneInputPrimitive, {
  type Country,
  type Value,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";

import { cn } from "../../lib/utils";
import { Input } from "./input";

// ---------------------------------------------------------------------------
// Country select — flag icon + invisible native <select> overlay
// Props are injected by react-phone-number-input
// ---------------------------------------------------------------------------

type CountryOption = { value?: string; label: string; divider?: boolean };

interface CountrySelectProps {
  value?: Country;
  options: CountryOption[];
  onChange: (country?: Country) => void;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  disabled?: boolean;
  readOnly?: boolean;
  iconComponent: React.ElementType;
}

function CountrySelect({
  value,
  options,
  onChange,
  onFocus,
  onBlur,
  disabled,
  readOnly,
  iconComponent: Icon,
}: CountrySelectProps) {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const v = e.target.value;
      onChange(v === "ZZ" ? undefined : (v as Country));
    },
    [onChange]
  );

  return (
    // border-r provides the visual divider between flag and number input
    <div className="relative flex h-full items-center border-r border-input pl-3 pr-1">
      {/* Flag icon — pointer-events-none so clicks pass through to <select> */}
      <span aria-hidden className="pointer-events-none flex items-center">
        <Icon country={value} label={value ?? "International"} />
      </span>

      {/* Chevron */}
      <svg
        className="ml-1 h-3 w-3 shrink-0 text-muted-foreground"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden
      >
        <path
          d="M2 4l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Full-area transparent <select> — keyboard navigable, accessible */}
      <select
        className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        value={value ?? "ZZ"}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled || readOnly}
        aria-label="Country"
      >
        {options.map(({ value: v, label, divider }) => (
          <option
            key={divider ? "|" : (v ?? "ZZ")}
            value={divider ? "|" : (v ?? "ZZ")}
            disabled={!!divider}
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Custom <input> — uses the project's Input styles, strips the outer border
// so the parent container provides the single border + focus ring
// ---------------------------------------------------------------------------

const PhoneNumberInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>((props, ref) => (
  <Input
    ref={ref}
    {...props}
    className={cn(
      "h-full flex-1 rounded-none border-0 bg-transparent px-3 text-sm shadow-none focus-visible:ring-0",
      props.className
    )}
  />
));
PhoneNumberInput.displayName = "PhoneNumberInput";

// ---------------------------------------------------------------------------
// Container — styled outer wrapper; receives className/style from the lib
// ---------------------------------------------------------------------------

const PhoneInputContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="phone-input"
    className={cn(
      "flex h-10 w-full items-center overflow-hidden rounded-md border border-input bg-background",
      "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
      className
    )}
    {...props}
  />
));
PhoneInputContainer.displayName = "PhoneInputContainer";

// ---------------------------------------------------------------------------
// Public PhoneInput component
// ---------------------------------------------------------------------------

/**
 * Props for the PhoneInput component.
 */
export interface PhoneInputProps {
  /** 
   * E.164 phone number value, e.g. "+12133734253".
   */
  value?: Value;
  /**
   * Callback fired when the phone number value changes.
   */
  onChange: (value?: Value) => void;
  /**
   * The default country code to select initially (ISO 3166-1 alpha-2).
   * @default "ID"
   */
  defaultCountry?: Country;
  /**
   * Placeholder text for the input field.
   * @default "Phone number"
   */
  placeholder?: string;
  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the input is read-only.
   */
  readOnly?: boolean;
  /**
   * Whether the input is required.
   */
  required?: boolean;
  /**
   * HTML id attribute for the input.
   */
  id?: string;
  /**
   * HTML name attribute for the input.
   */
  name?: string;
  /**
   * Optional CSS class name for styling the container.
   */
  className?: string;
}

/**
 * PhoneInput component for international phone numbers with a country selector.
 * Wraps `react-phone-number-input` to match the project's design system.
 */
function PhoneInput({
  value,
  onChange,
  defaultCountry = "ID",
  placeholder = "Phone number",
  disabled,
  className,
  ...props
}: PhoneInputProps) {
  return (
    <PhoneInputPrimitive
      value={value}
      onChange={onChange}
      defaultCountry={defaultCountry}
      disabled={disabled}
      placeholder={placeholder}
      international
      flags={flags}
      countrySelectComponent={CountrySelect}
      inputComponent={PhoneNumberInput}
      containerComponent={PhoneInputContainer}
      containerComponentProps={{
        className: cn(disabled && "cursor-not-allowed opacity-50", className),
      }}
      {...props}
    />
  );
}

export { PhoneInput };
