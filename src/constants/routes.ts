type PageProps = {
  id: string,
  text?: string,
  path: string,
  isExact?: boolean,
};

export const LOGIN_PAGE: PageProps = {
  id: 'LOGIN_PAGE',
  path: '/login'
};

export const MEETUPS_PAGE: PageProps = {
  id: 'MEETUPS_PAGE',
  text: 'Meetups',
  path: '/meetups',
  isExact: true,
};

export const CREATE_NEWS_PAGE: PageProps = {
  id: 'CREATE_NEWS_PAGE',
  text: 'Create News',
  path: '/create-news',
};

export const NEWS_PAGE: PageProps = {
  id: 'NEWS_PAGE',
  text: 'News',
  path: '/news',
};

export const TOPICS_PAGE: PageProps = {
  id: 'TOPICS_PAGE',
  text: 'Topics',
  path: MEETUPS_PAGE.path,
  isExact: true,
};
export const MODERATION_PAGE: PageProps = {
  id: 'MODERATION_PAGE',
  text: 'Moderation',
  path: `${MEETUPS_PAGE.path}/moderation`,
};
export const FUTURE_PAGE: PageProps = {
  id: 'FUTURE_PAGE',
  text: 'Future',
  path: `${MEETUPS_PAGE.path}/future`,
};
export const PAST_PAGE: PageProps = {
  id: 'PAST_PAGE',
  text: 'Past',
  path: `${MEETUPS_PAGE.path}/past`,
};
export const TOPIC_DETAIL_PAGE: PageProps = {
  id: 'TOPIC_DETAIL_PAGE',
  text: 'Viewing Topic',
  path: '/topic',
};
export const MEETUP_DETAIL_PAGE: PageProps = {
  id: 'MEETUP_DETAIL_PAGE',
  text: 'Viewing Meetup',
  path: '/meetup',
};

export const NEWS_DETAIL_PAGE: PageProps = {
  id: 'NEWS_DETAIL_PAGE',
  text: 'Viewing News',
  path: '/news',
};

export const CREATE_MEETUP_PAGE: PageProps = {
  id: 'CREATE_MEETUP_PAGE',
  text: 'New Meetup',
  path: '/create-meetup',
};

export const EDIT_MEETUP_PAGE: PageProps = {
  id: 'EDIT_MEETUP_PAGE',
  text: 'Edit Meetup',
  path: '/edit-meetup',
};

export const EDIT_NEWS_PAGE: PageProps = {
  id: 'EDIT_NEWS_PAGE',
  text: 'Edit News',
  path: '/edit-news',
};

export const HEADER_MENU_ROUTES = [
  MEETUPS_PAGE,
  NEWS_PAGE,
];

export const MEETUPS_MENU_ROUTES = [
  TOPICS_PAGE,
  MODERATION_PAGE,
  FUTURE_PAGE,
  PAST_PAGE
];
