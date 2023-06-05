import { Box, Stack } from '@mui/material';
import { INestedMessage } from 'state/chat';
import { IElements } from 'state/element';
import { useState } from 'react';
import DetailsButton from 'components/chat/message/detailsButton';
import Messages from './messages';
import MessageContent from './content';
import UploadButton from './uploadButton';
import { IAction } from 'state/action';
import Author, { authorBoxWidth } from './author';
import Buttons from './buttons';

interface Props {
  message: INestedMessage;
  elements: IElements;
  actions: IAction[];
  indent: number;
  showAvatar?: boolean;
  showBorder?: boolean;
  isRunning?: boolean;
  isLast?: boolean;
}

const Message = ({
  message,
  elements,
  actions,
  indent,
  showAvatar,
  showBorder,
  isRunning,
  isLast
}: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Box
      sx={{
        color: 'text.primary',
        backgroundColor: 'transparent'
      }}
      className="message"
    >
      <Box
        sx={{
          boxSizing: 'border-box',
          mx: 'auto',
          maxWidth: '60rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <Stack
          direction="row"
          ml={indent ? `${indent * (authorBoxWidth + 16)}px` : 0}
          sx={{
            py: 2,
            borderBottom: (theme) =>
              showBorder ? `1px solid ${theme.palette.divider}` : 'none'
          }}
        >
          <Author message={message} show={showAvatar} />
          <Stack alignItems="flex-start" width={0} flexGrow={1} spacing={1}>
            <MessageContent
              authorIsUser={message.authorIsUser}
              actions={actions}
              elements={elements}
              id={message.id ? message.id.toString() : message.tempId}
              content={message.content}
              language={message.language}
            />
            <DetailsButton
              message={message}
              opened={showDetails}
              onClick={() => setShowDetails(!showDetails)}
              loading={isRunning}
            />
            {!isRunning && isLast && message.waitForAnswer && <UploadButton />}
            <Buttons message={message} />
          </Stack>
        </Stack>
      </Box>
      {message.subMessages && showDetails && (
        <Messages
          messages={message.subMessages}
          actions={actions}
          elements={elements}
          indent={indent + 1}
          isRunning={isRunning}
        />
      )}
    </Box>
  );
};

export default Message;
