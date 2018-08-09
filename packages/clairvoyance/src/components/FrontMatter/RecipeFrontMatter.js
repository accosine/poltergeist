import React, { Fragment } from 'react';
import ChipInput from './ChipInput';
import FrontMatterTextfield from './FrontMatterTextfield';

export default props => (
  <Fragment>
    <ChipInput
      id="ingredients"
      onChange={ingredients => props.onChange({ ingredients })}
      chipData={props.ingredients}
    />
    <FrontMatterTextfield
      id="instructions"
      multiline
      rows={2}
      rowsMax={5}
      {...props}
    />
    <FrontMatterTextfield id="preptime" inputType="number" {...props} />
    <FrontMatterTextfield id="cooktime" inputType="number" {...props} />
    <FrontMatterTextfield id="recipeyield" {...props} />
    <FrontMatterTextfield id="servingsize" {...props} />
    <FrontMatterTextfield id="calories" inputType="number" {...props} />
    <FrontMatterTextfield id="fatcontent" inputType="number" {...props} />
  </Fragment>
);
