import React, { useEffect, useRef, useState } from "react";
import useMemberStore from "./../../stores/userStore";
import axios from "axios";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import SendIcon from '@mui/icons-material/Send';
import { getBabyList } from "../../api/UserApi";


const UpdateChild = (props) => {
  const userNum = useMemberStore(state => state.userNum)
  const baby = props.baby
  console.log(baby)
  const motherNum = baby.motherNum;
  const [status, setStatus] = useState(null)
  const today = dayjs(moment(new Date()).format('YYYY-MM-DD'))
  const [initState, setInitState] = useState({
    name: baby.name,
    gender: baby.gender,
    birth: baby.birth,
    pregnancyDate: baby.pregnancyDate,
    status: baby.status,
  });
  console.log(initState)
  const handleChange = (event) => {
    setInitState({...initState, [event.target.name] : event.target.value})
  };
  const dateInputBefore = useRef()
  const dateInputAfter = useRef()

  useEffect(()=> {
    if (baby.status) {
      setStatus('after')
    }
    else{
      setStatus('before')
    }
  }, [])

  const addChild = () => {
    // console.log(initState)
    axios({
      method: "put",
      url: `/api/baby/update`,
      data: {
        babyNum: baby.num,
        name: initState.name,
        gender: initState.gender,
        birth: initState.birth,
        pregnancyDate: initState.pregnancyDate,
        status: initState.status,
      },
    })
    .then((res) => {
      window.alert('수정되었습니다.')
      getBabyList(userNum)
      props.setOpen(false)
    })
    .catch(err => console.log(err))
  };
  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          임신 여부
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={status} 
        >
          <FormControlLabel
            onClick={() => {
              setStatus("before")
              setInitState({...initState, status: false, birth:''})
            }}
            value="before"
            control={<Radio />}
            label="임신"
            name="precnancy"
          />
          <FormControlLabel
            onClick={() => {
              setStatus("after")
              setInitState({...initState, status: true,})
          }}
            value="after"
            control={<Radio />}
            label="출산"
            name="precnancy"
          />
        </RadioGroup>
      </FormControl>
      <Box>
      {status === 'before' &&
      <>
      <TextField label='태명' value={baby.name} name='name' onChange={handleChange} />
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          성별
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={initState.gender}
        >
          <FormControlLabel
            value={0}
            control={<Radio />}
            label="모름"
            name="gender"
            onChange={handleChange}
          />
          <FormControlLabel
            value={1}
            control={<Radio />}
            label="남자"
            name="gender"
            onChange={handleChange}
          />
          <FormControlLabel
            value={2}
            control={<Radio />}
            label="여자"
            name="gender"
            onChange={handleChange}
          />
        </RadioGroup>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            ref={dateInputBefore}
            label="임신 추측일"
            name="pregnancyDate"
            value={baby.pregnancyDate? moment(baby.pregnancyDate) : today}
            onChange={(newValue) => setInitState({...initState, pregnancyDate:moment(newValue.$d).format('YYYY-MM-DD')})}
            disableFuture
          />
        </DemoContainer>
      </LocalizationProvider>
      </>
      }
      {status === 'after' &&
      <>
      <TextField label='이름' defaultValue={baby.name} name='name' onChange={handleChange} />
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          성별
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={initState.gender}
        >
          <FormControlLabel
            value={1}
            control={<Radio />}
            label="남자"
            name="gender"
            onChange={handleChange}
          />
          <FormControlLabel
            value={2}
            control={<Radio />}
            label="여자"
            name="gender"
            onChange={handleChange}
          />
        </RadioGroup>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            ref={dateInputAfter}
            label="출생일"
            name="birth"
            value={baby.birth ? moment(baby.birth) : today}
            onChange={(newValue) => setInitState({...initState, birth:moment(newValue.$d).format('YYYY-MM-DD')})}
            disableFuture 
          />
        </DemoContainer>
      </LocalizationProvider>
      </>
      }
      </Box>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="#fcafaf" variant="contained" endIcon={<SendIcon />} onClick={addChild}>
            등록하기
          </Button>
        </div>
        </div>
      </div>
    </Container>
  );
};

export default UpdateChild;