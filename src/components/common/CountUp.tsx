import React, { useEffect, useState } from 'react';

interface CountUpProps {
  end: string | number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '', 
  className = '' 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    
    // Parse the end value
    let endValue = 0;
    if (typeof end === 'number') {
      endValue = end;
    } else {
      // Remove commas and non-numeric chars except decimal point
      endValue = parseFloat(end.replace(/,/g, '').replace(/[^0-9.-]+/g, ''));
    }

    if (isNaN(endValue)) endValue = 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setCount(easeProgress * endValue);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration]);

  // Format the number back to string with commas/decimals
  const formattedCount = count.toLocaleString(undefined, {
    minimumFractionDigits: typeof end === 'string' && end.includes('.') ? 1 : 0,
    maximumFractionDigits: typeof end === 'string' && end.includes('.') ? 1 : 0,
  });

  return (
    <span className={className}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
};

export default CountUp;
