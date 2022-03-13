import React, { forwardRef } from 'react';
import "../styles/button.scss";

import { ButtonType } from '../types/components';

const Button = forwardRef<HTMLButtonElement, ButtonType>(({ extraClasses, children, ...props }, ref) => (
  <button ref={ref} className={`button ${extraClasses}`} {...props}>{children}</button>
));

export default Button;
