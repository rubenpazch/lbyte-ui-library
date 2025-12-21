import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import NumericPicker, { type NumericPickerProps } from './NumericPicker';

const meta: Meta<NumericPickerProps> = {
  title: 'Components/NumericPicker',
  component: NumericPicker as any,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default currency picker with Peruvian Soles
 */
export const Default: Story = {
  args: {
    value: '0',
    onChange: () => {},
    currency: 'S/.',
    placeholder: '0.00',
  },
};

/**
 * With label
 */
export const WithLabel: Story = {
  args: {
    label: 'Price',
    value: '100.00',
    onChange: () => {},
    currency: 'S/.',
  },
};

/**
 * Required field
 */
export const Required: Story = {
  args: {
    label: 'Total Cost',
    value: '250.50',
    onChange: () => {},
    required: true,
    currency: 'S/.',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Amount',
    value: '150.00',
    onChange: () => {},
    disabled: true,
    currency: 'S/.',
  },
};

/**
 * With custom range
 */
export const WithRange: Story = {
  args: {
    label: 'Budget Amount',
    value: '500',
    onChange: () => {},
    min: 0,
    max: 10000,
    step: 100,
    currency: 'S/.',
  },
};

/**
 * Dollar currency
 */
export const DollarCurrency: Story = {
  args: {
    label: 'USD Amount',
    value: '99.99',
    onChange: () => {},
    currency: '$',
    step: 0.5,
  },
};

/**
 * Euro currency
 */
export const EuroCurrency: Story = {
  args: {
    label: 'EUR Amount',
    value: '75.50',
    onChange: () => {},
    currency: '€',
  },
};

/**
 * No currency symbol
 */
export const NoCurrency: Story = {
  args: {
    label: 'Plain Number',
    value: '42',
    onChange: () => {},
    currency: '',
  },
};

/**
 * Small step increments
 */
export const SmallStep: Story = {
  args: {
    label: 'Precise Amount',
    value: '10.50',
    onChange: () => {},
    step: 0.25,
    currency: 'S/.',
  },
};

/**
 * Large step increments
 */
export const LargeStep: Story = {
  args: {
    label: 'Bulk Amount',
    value: '500',
    onChange: () => {},
    step: 50,
    currency: 'S/.',
  },
};

/**
 * Prescription budget - Total cost
 */
export const PrescriptionTotalCost: Story = {
  args: {
    label: 'Total Cost',
    value: '350.00',
    onChange: () => {},
    min: 0,
    max: 5000,
    step: 10,
    decimals: 2,
    currency: 'S/.',
    required: true,
  },
};

/**
 * Prescription budget - Deposit paid
 */
export const PrescriptionDepositPaid: Story = {
  args: {
    label: 'Deposit Paid',
    value: '175.00',
    onChange: () => {},
    min: 0,
    max: 5000,
    step: 10,
    decimals: 2,
    currency: 'S/.',
    required: true,
  },
};

/**
 * Interactive currency picker with state
 */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('250.00');
    const [message, setMessage] = useState('');

    const handleChange = (newValue: string) => {
      setValue(newValue);
      setMessage(`Updated to S/. ${newValue}`);
      setTimeout(() => setMessage(''), 3000);
    };

    return (
      <div className="space-y-4 max-w-md">
        <NumericPicker
          label="Amount in Soles"
          value={value}
          onChange={handleChange}
          min={0}
          max={10000}
          step={50}
          currency="S/."
          required={true}
        />
        {message && (
          <div className="p-3 bg-green-50 border border-green-200 rounded text-green-700">
            {message}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Budget form with multiple fields
 */
export const BudgetForm: Story = {
  render: () => {
    const [totalCost, setTotalCost] = useState('1000.00');
    const [depositPaid, setDepositPaid] = useState('500.00');

    const balanceDue = (parseFloat(totalCost) - parseFloat(depositPaid)).toFixed(2);

    return (
      <div className="space-y-6 max-w-md p-6 bg-white rounded-lg border-2 border-blue-300">
        <div>
          <h2 className="text-2xl font-bold mb-4">Budget</h2>
        </div>

        <NumericPicker
          label="Total Cost"
          value={totalCost}
          onChange={setTotalCost}
          min={0}
          max={5000}
          step={10}
          currency="S/."
          required={true}
        />

        <NumericPicker
          label="Deposit Paid"
          value={depositPaid}
          onChange={setDepositPaid}
          min={0}
          max={5000}
          step={10}
          currency="S/."
          required={true}
        />

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Balance Due</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">
              S/.
            </span>
            <input
              type="text"
              value={balanceDue}
              disabled
              className="w-full pl-12 pr-3 py-2.5 border-2 border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1.5">Auto-calculated</p>
        </div>
      </div>
    );
  },
};

/**
 * Minimum value enforcement
 */
export const MinimumValue: Story = {
  args: {
    label: 'Amount (Minimum S/. 10)',
    value: '5',
    onChange: () => {},
    min: 10,
    max: 1000,
    currency: 'S/.',
  },
};

/**
 * Maximum value enforcement
 */
export const MaximumValue: Story = {
  args: {
    label: 'Amount (Maximum S/. 500)',
    value: '600',
    onChange: () => {},
    min: 0,
    max: 500,
    currency: 'S/.',
  },
};

/**
 * Different decimal places
 */
export const OneDecimal: Story = {
  args: {
    label: 'One Decimal Place',
    value: '99.9',
    onChange: () => {},
    decimals: 1,
    currency: 'S/.',
  },
};

/**
 * No decimal places
 */
export const NoDecimals: Story = {
  args: {
    label: 'Whole Numbers Only',
    value: '100',
    onChange: () => {},
    decimals: 0,
    currency: 'S/.',
  },
};

/**
 * Zero value state
 */
export const ZeroValue: Story = {
  args: {
    label: 'Starting Amount',
    value: '0',
    onChange: () => {},
    currency: 'S/.',
  },
};

/**
 * Large amounts
 */
export const LargeAmount: Story = {
  args: {
    label: 'Large Transaction',
    value: '999999.99',
    onChange: () => {},
    min: 0,
    max: 999999,
    step: 1000,
    currency: 'S/.',
  },
};

/**
 * Very small increments
 */
export const PreciseAmount: Story = {
  args: {
    label: 'Precise Amount',
    value: '12.55',
    onChange: () => {},
    step: 0.01,
    currency: 'S/.',
  },
};

/**
 * Invoice items list
 */
export const InvoiceItems: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, name: 'Frames', price: '250.00' },
      { id: 2, name: 'Lenses OD', price: '300.00' },
      { id: 3, name: 'Lenses OS', price: '300.00' },
      { id: 4, name: 'Coatings', price: '100.00' },
    ]);

    const handlePriceChange = (id: number, newPrice: string) => {
      setItems(items.map((item) => (item.id === id ? { ...item, price: newPrice } : item)));
    };

    const total = items.reduce((sum, item) => sum + parseFloat(item.price || '0'), 0).toFixed(2);

    return (
      <div className="space-y-4 max-w-2xl">
        <h2 className="text-2xl font-bold">Invoice Items</h2>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-end gap-4">
              <label className="flex-1 text-sm font-medium text-gray-700">{item.name}</label>
              <div className="w-40">
                <NumericPicker
                  value={item.price}
                  onChange={(price) => handlePriceChange(item.id, price)}
                  min={0}
                  max={5000}
                  step={50}
                  currency="S/."
                />
              </div>
            </div>
          ))}
        </div>

        <div className="border-t-2 pt-4 mt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="text-green-600">S/. {total}</span>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Currency comparison
 */
export const CurrencyComparison: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <NumericPicker label="Peruvian Soles" value="350.00" onChange={() => {}} currency="S/." />
      <NumericPicker label="US Dollars" value="95.00" onChange={() => {}} currency="$" />
      <NumericPicker label="Euros" value="88.00" onChange={() => {}} currency="€" />
      <NumericPicker label="British Pounds" value="75.00" onChange={() => {}} currency="£" />
    </div>
  ),
};
