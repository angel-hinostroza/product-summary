import React from 'react'
// eslint-disable-next-line no-restricted-imports
import { path } from 'ramda'
import PropTypes from 'prop-types'
import { ProductName } from 'vtex.store-components'
import { useCssHandles } from 'vtex.css-handles'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

const CSS_HANDLES = [
  'nameContainer',
  'nameWrapper',
  'brandName',
  'skuName',
  'productReference',
  'productNameLoader',
]

const ProductSummaryName = ({ showFieldsProps, tag }) => {
  const { product } = useProductSummary()
  const handles = useCssHandles(CSS_HANDLES)
  const productName = path(['productName'], product)
  // TODO: change ProductSummaryContext to have `selectedSku` field instead of `sku`
  const skuName = path(['sku', 'name'], product)
  const brandName = path(['brand'], product)

  const containerClasses = `${handles.nameContainer} flex items-start justify-center pv6`
  const wrapperClasses = `${handles.nameWrapper} overflow-hidden c-on-base f5`
  const brandNameClasses = `${handles.brandName} t-body`
  const skuNameClasses = `${handles.skuName} t-small`
  const loaderClasses = `${handles.productNameLoader} pt5 overflow-hidden`

  return (
    <div className={containerClasses}>
      <ProductName
        className={wrapperClasses}
        brandNameClass={brandNameClasses}
        skuNameClass={skuNameClasses}
        loaderClass={loaderClasses}
        productReferenceClass={handles.productReference}
        name={productName}
        skuName={skuName}
        brandName={brandName}
        tag={tag}
        {...showFieldsProps}
      />
    </div>
  )
}

ProductSummaryName.defaultProps = {
  showFieldsProps: {
    showProductReference: false,
    showBrandName: false,
    showSku: false,
  },
  tag: 'h1',
}

ProductSummaryName.propTypes = {
  /** Name schema props */
  showFieldsProps: PropTypes.object,
  tag: PropTypes.string,
}

ProductSummaryName.getSchema = () => {
  return {
    title: 'admin/editor.productSummaryName.title',
    type: 'object',
    properties: {
      showFieldsProps: ProductName.schema,
    },
  }
}

export default ProductSummaryName
