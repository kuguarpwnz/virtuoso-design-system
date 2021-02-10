import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object } from '@storybook/addon-knobs';
import styles from 'lib/styles/build/js/design_tokens';
import {
  Button,
  ContentModal,
  Tabs,
  Tab,
  TabPanel,
  TabList,
  Icon,
  Table,
  TR,
  TH,
  TD,
  THead,
  TBody,
} from '@';

const getContentHeight = (varHeight = '0') => `calc( 100vh - 40px - 265px - ${varHeight}px)`;

const noSubtitle = {
  height: 'calc( 100vh - 40px - 265px)',
};

const contentStyle = {
  overflowY: 'scroll',
  // - overlay margins, rest of modal (base), tabs
  height: 'calc( 100vh - 40px - 265px - 36px)',
};

const sample = [
  { event: 'Activation Started', details: 'by user@domain.com', date: '2021-07-03' },
  { event: 'Secure File Encrypted', details: 'by user@domain.com', date: '2020-05-02' },
  { event: 'Secure Email Sent', details: 'by user@domain.com', date: '2019-07-01' },
];
const data = new Array(100).fill(sample).flat();

const tabLabels = ['Activity Feed', 'Access Control', 'Security Options'];
const ModalContentTabs = () => (
  <>
    <Tabs size={Tabs.SIZE.SMALL}>
      <TabList>
        {tabLabels.map((label) => (
          <Tab>{label}</Tab>
        ))}
      </TabList>
      {[
        <TabPanel>
          <div style={contentStyle}>
            <Table isScrollableBody>
              <THead>
                <TR>
                  <TH>Event</TH>
                  <TH>Details</TH>
                  <TH>Date</TH>
                </TR>
              </THead>
              <TBody>
                {data.map((d) => (
                  <TR>
                    <TD>{d.event}</TD>
                    <TD>{d.details}</TD>
                    <TD>{d.date}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </div>
        </TabPanel>,
        <TabPanel>
          <div style={contentStyle} />
        </TabPanel>,
        <TabPanel>
          <div style={contentStyle} />
        </TabPanel>,
      ]}
    </Tabs>
  </>
);

const ModalContentPinkBox = () => (
  <div
    style={{
      background: styles.vds.color.red.lightest.value,
      width: '100%',
      height: 'calc( 100vh - 40px - 265px)',
    }}
  />
);

storiesOf('ContentModal', module)
  .lokiSkip('default', () => {
    const title = object('Title', { key: 'Filename', value: 'january-reports.pdf' });
    const subtitle = text(
      'Subtitle',
      'Google Drive file shared by khart@acmecorp.com on November 16, 2020, 7:16 am',
    );
    const titleIconName = text('Title Icon', Icon.NAMES.PDF);
    const subtitleIconName = text('Subtitle Icon', Icon.NAMES.DRIVE);

    return (
      <ContentModal
        header={<Button variant={Button.VARIANT.SECONDARY} size={Button.SIZE.SQUARE} />}
        title={title}
        subtitle={subtitle}
        titleIconName={titleIconName}
        subtitleIconName={subtitleIconName}
        onRequestClose={() => alert('close')}
        onRequestBack={() => alert('back')}
      >
        {ModalContentTabs()}
      </ContentModal>
    );
  })
  .add('no icons', () => (
    <ContentModal title={{ value: 'Random Title' }} subtitle="Random subtitle">
      {ModalContentPinkBox()}
    </ContentModal>
  ));
