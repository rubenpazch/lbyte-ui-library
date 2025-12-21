import { useState } from 'react';
import NumericUpPicker from './NumericUpPicker';

// Define the props type based on the component's interface
type NumericUpPickerProps = {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  hint?: string;
  warning?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  useMinAsDefault?: boolean;
  alwaysNegative?: boolean;
  integerOnly?: boolean;
  showSign?: boolean;
};

/**
 * Wrapper component that provides state management for NumericUpPicker stories
 */
export const NumericUpPickerWithState = ({
  initialValue = '0',
  ...props
}: Omit<NumericUpPickerProps, 'value' | 'onChange'> & {
  initialValue?: string;
}) => {
  const [value, setValue] = useState(initialValue);

  return <NumericUpPicker {...props} value={value} onChange={setValue} />;
};

/**
 * Wrapper for stories with dynamic error validation
 */
export const NumericUpPickerWithErrorValidation = ({
  initialValue = '0',
  min = 0,
  max = 100,
  errorMessage = 'Value must be between {min} and {max}',
  ...props
}: Omit<NumericUpPickerProps, 'value' | 'onChange' | 'error'> & {
  initialValue?: string;
  errorMessage?: string;
}) => {
  const [value, setValue] = useState(initialValue);
  const numValue = parseFloat(value) || 0;
  const hasError = (min !== undefined && numValue < min) || (max !== undefined && numValue > max);

  return (
    <NumericUpPicker
      {...props}
      min={min}
      max={max}
      value={value}
      onChange={setValue}
      error={
        hasError ? errorMessage.replace('{min}', String(min)).replace('{max}', String(max)) : ''
      }
    />
  );
};

/**
 * Wrapper for stories with dynamic warning
 */
export const NumericUpPickerWithWarning = ({
  initialValue = '0',
  warningThreshold = 90,
  warningMessage = 'This value is near the maximum',
  ...props
}: Omit<NumericUpPickerProps, 'value' | 'onChange' | 'warning'> & {
  initialValue?: string;
  warningThreshold?: number;
  warningMessage?: string;
}) => {
  const [value, setValue] = useState(initialValue);
  const numValue = parseFloat(value) || 0;
  const showWarning = numValue >= warningThreshold;

  return (
    <NumericUpPicker
      {...props}
      value={value}
      onChange={setValue}
      warning={showWarning ? warningMessage : ''}
    />
  );
};

/**
 * Wrapper for interactive demo with visual feedback
 */
export const NumericUpPickerInteractive = ({
  initialValue = '50',
  showFeedback = true,
  feedbackDuration = 2000,
  ...props
}: Omit<NumericUpPickerProps, 'value' | 'onChange'> & {
  initialValue?: string;
  showFeedback?: boolean;
  feedbackDuration?: number;
}) => {
  const [value, setValue] = useState(initialValue);
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (showFeedback) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), feedbackDuration);
    }
  };

  return (
    <div className="space-y-4">
      <NumericUpPicker {...props} value={value} onChange={handleChange} />
      {showFeedback && showMessage && (
        <div className="p-3 bg-green-50 border border-green-200 rounded text-green-700">
          Value updated: {value}
        </div>
      )}
    </div>
  );
};

/**
 * Wrapper for prescription form with multiple fields
 */
export const PrescriptionForm = () => {
  // Right Eye / Ojo Derecho (OD)
  const [odSphere, setOdSphere] = useState('-2.50');
  const [odCylinder, setOdCylinder] = useState('-1.00');
  const [odAxis, setOdAxis] = useState('90');
  const [odAdd, setOdAdd] = useState('1.50');

  // Left Eye / Ojo Izquierdo (OI)
  const [osSphere, setOsSphere] = useState('-2.75');
  const [osCylinder, setOsCylinder] = useState('-1.25');
  const [osAxis, setOsAxis] = useState('85');
  const [osAdd, setOsAdd] = useState('1.50');

  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">OD (Right Eye / Ojo Derecho)</h3>
        <div className="space-y-4">
          <NumericUpPicker
            label="Sphere"
            value={odSphere}
            onChange={setOdSphere}
            min={-20.0}
            max={20.0}
            step={0.25}
          />
          <NumericUpPicker
            label="Cylinder"
            value={odCylinder}
            onChange={setOdCylinder}
            min={-6.0}
            max={6.0}
            step={0.25}
          />
          <NumericUpPicker
            label="Axis"
            value={odAxis}
            onChange={setOdAxis}
            min={0}
            max={180}
            step={1}
          />
          <NumericUpPicker
            label="Add"
            value={odAdd}
            onChange={setOdAdd}
            min={0.5}
            max={4.0}
            step={0.25}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">OS (Left Eye / Ojo Izquierdo)</h3>
        <div className="space-y-4">
          <NumericUpPicker
            label="Sphere"
            value={osSphere}
            onChange={setOsSphere}
            min={-20.0}
            max={20.0}
            step={0.25}
          />
          <NumericUpPicker
            label="Cylinder"
            value={osCylinder}
            onChange={setOsCylinder}
            min={-6.0}
            max={6.0}
            step={0.25}
          />
          <NumericUpPicker
            label="Axis"
            value={osAxis}
            onChange={setOsAxis}
            min={0}
            max={180}
            step={1}
          />
          <NumericUpPicker
            label="Add"
            value={osAdd}
            onChange={setOsAdd}
            min={0.5}
            max={4.0}
            step={0.25}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Wrapper for error recovery demo
 */
export const NumericUpPickerWithErrorRecovery = ({
  initialValue = '150',
  min = 0,
  max = 100,
  step = 10,
}: {
  initialValue?: string;
  min?: number;
  max?: number;
  step?: number;
}) => {
  const [value, setValue] = useState(initialValue);
  const hasError = parseFloat(value) > max;

  return (
    <div className="space-y-4">
      <NumericUpPicker
        label="Value with Range Limit"
        value={value}
        onChange={setValue}
        min={min}
        max={max}
        step={step}
        error={hasError ? `Maximum value is ${max}` : ''}
        hint={!hasError ? `Range: ${min} to ${max}` : ''}
      />
      <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-700">
        Current value: {value} {hasError && '(OUT OF RANGE)'}
      </div>
    </div>
  );
};

/**
 * Wrapper for showSign mode
 */
export const NumericUpPickerShowSign = ({
  initialValue = '2.50',
  ...props
}: Omit<NumericUpPickerProps, 'value' | 'onChange' | 'showSign'> & {
  initialValue?: string;
}) => {
  const [value, setValue] = useState(initialValue);

  return <NumericUpPicker {...props} value={value} onChange={setValue} showSign={true} />;
};

/**
 * Wrapper for alwaysNegative mode
 */
export const NumericUpPickerAlwaysNegative = ({
  initialValue = '-2.00',
  ...props
}: Omit<NumericUpPickerProps, 'value' | 'onChange' | 'alwaysNegative'> & {
  initialValue?: string;
}) => {
  const [value, setValue] = useState(initialValue);

  return <NumericUpPicker {...props} value={value} onChange={setValue} alwaysNegative={true} />;
};

/**
 * Wrapper for integerOnly mode
 */
export const NumericUpPickerIntegerOnly = ({
  initialValue = '90',
  ...props
}: Omit<NumericUpPickerProps, 'value' | 'onChange' | 'integerOnly'> & {
  initialValue?: string;
}) => {
  const [value, setValue] = useState(initialValue);

  return <NumericUpPicker {...props} value={value} onChange={setValue} integerOnly={true} />;
};
