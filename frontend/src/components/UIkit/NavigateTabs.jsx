import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const StyledTabs = styled(Tabs)(({ theme }) => ({
  width: '100%',
}))

// Tabコンポーネントを拡張し、リンクとして機能させる
const LinkTab = (props) => {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        // event.preventDefault();
      }}
      aria-current={props.selected && 'page'}
      {...props}
    />
  )
}

LinkTab.propTypes = {
  selected: PropTypes.bool,
}

const NavigateTabs = ({ tabConfig, value, onChange }) => {
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    const selectedPath = tabConfig.find((tab) => tab.index === newValue)?.value
    if (selectedPath) {
      navigate(selectedPath)
      onChange(selectedPath) //親コンポーネントにvalueの値が変更されたことを通知
    }
  }

  // 親コンポーネントから渡された value (URL) を Tabs の value (index) に変換
  const getTabIndexFromPath = () => {
    return tabConfig.findIndex((tab) => tab.value === value)
  }

  return (
    <StyledTabs
      value={getTabIndexFromPath()}
      onChange={handleChange}
      aria-label="navigation tabs"
      role="navigation"
      variant="scrollable"
      scrollButtons="auto"
    >
      {tabConfig &&
        tabConfig.map((tab) => <LinkTab key={tab.value} label={tab.label} href={tab.value} value={tab.index} />)}
    </StyledTabs>
  )
}

NavigateTabs.propTypes = {
  tabConfig: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default NavigateTabs
