import React, { useMemo, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const colors = {
  teal: '#2BA3A3',
  tealDark: '#0A6E6E',
  tealLight: '#E6F2F2',
  green: '#12B886',
  marigold: '#F5A623',
  ink: '#142423',
  muted: '#60706E',
  line: '#DDEAE8',
  white: '#FFFFFF',
  surface: '#F7FBFA',
};

const flowScreens = [
  'Splash',
  'Sign Up',
  'Login',
  'Business Type',
  'Business Details',
  'Electricity',
  'LPG',
  'Waste',
  'Result',
  'Marketplace',
  'Project Detail',
  'Purchase',
  'Payment',
  'Success',
  'Dashboard',
  'Learn',
  'Profile',
] as const;

const appScreens = ['Dashboard', 'Marketplace', 'Learn', 'Profile', 'Success'] as const;

type ScreenName = typeof flowScreens[number];
type ProjectType = 'Forest' | 'Solar' | 'Biogas';
type Project = {
  title: string;
  location: string;
  price: number;
  type: ProjectType;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
};

const businessTypes: Array<[string, keyof typeof MaterialCommunityIcons.glyphMap]> = [
  ['Cafe', 'coffee-outline'],
  ['Restaurant', 'silverware-fork-knife'],
  ['Bakery', 'cupcake'],
  ['Cloud Kitchen', 'chef-hat'],
  ['Other', 'store-outline'],
];

const cities = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad'];
const revenueRanges = ['< INR 5L', 'INR 5L-15L', 'INR 15L-40L', 'INR 40L+'];
const wasteRanges = ['<5 kg', '5-15 kg', '15+ kg'];
const deliveryApps = ['Zomato', 'Swiggy', 'Own delivery'];
const filters: ProjectType[] = ['Forest', 'Solar', 'Biogas'];

const projects: Project[] = [
  {
    title: 'Western Ghats Forest Revival',
    location: 'Karnataka',
    price: 820,
    type: 'Forest',
    icon: 'tree-outline',
    color: '#E8F7EE',
  },
  {
    title: 'Rajasthan Solar Microgrid',
    location: 'Jodhpur',
    price: 760,
    type: 'Solar',
    icon: 'solar-power',
    color: '#FFF5DD',
  },
  {
    title: 'Pune Food Waste Biogas',
    location: 'Maharashtra',
    price: 690,
    type: 'Biogas',
    icon: 'recycle',
    color: '#E6F2F2',
  },
];

const articles = [
  ['Basics', 'Carbon offsetting in plain English'],
  ['Carbon credits', 'How verified projects are checked'],
  ['Policy', 'What Indian small businesses should know'],
];

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('Splash');
  const [history, setHistory] = useState<ScreenName[]>([]);
  const [businessName, setBusinessName] = useState('Fresh Leaf Cafe');
  const [email, setEmail] = useState('owner@freshleaf.in');
  const [businessType, setBusinessType] = useState('Cafe');
  const [employees, setEmployees] = useState(6);
  const [city, setCity] = useState('Bengaluru');
  const [revenue, setRevenue] = useState('INR 5L-15L');
  const [electricity, setElectricity] = useState('620');
  const [lpg, setLpg] = useState(4);
  const [png, setPng] = useState(false);
  const [waste, setWaste] = useState('5-15 kg');
  const [delivery, setDelivery] = useState(true);
  const [deliveryApp, setDeliveryApp] = useState('Zomato');
  const [filter, setFilter] = useState<ProjectType>('Forest');
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [payment, setPayment] = useState('GPay');
  const [certificateShared, setCertificateShared] = useState(false);
  const [reportSaved, setReportSaved] = useState(false);
  const [badgeViews, setBadgeViews] = useState(214);

  const screenIndex = flowScreens.indexOf(screen);
  const progress = useMemo(
    () => Math.round(((screenIndex + 1) / flowScreens.length) * 100),
    [screenIndex]
  );
  const footprint = useMemo(() => {
    const kwh = Number.parseInt(electricity, 10) || 0;
    const wasteLoad = waste === '<5 kg' ? 0.6 : waste === '5-15 kg' ? 1.1 : 1.8;
    const deliveryLoad = delivery ? 0.7 : 0;
    return Number(((kwh * 0.00082 * 12) + (lpg * 0.18 * 12) + wasteLoad + deliveryLoad).toFixed(1));
  }, [delivery, electricity, lpg, waste]);
  const total = useMemo(() => Math.round(footprint * selectedProject.price + 299), [footprint, selectedProject]);

  const goTo = (target: ScreenName) => {
    if (target !== screen) {
      setHistory((items) => [...items, screen]);
      setScreen(target);
    }
  };
  const goNext = () => {
    const next = flowScreens[Math.min(screenIndex + 1, flowScreens.length - 1)];
    goTo(next);
  };
  const goBack = () => {
    const previous = history[history.length - 1];
    if (previous) {
      setHistory((items) => items.slice(0, -1));
      setScreen(previous);
    }
  };
  const restart = () => {
    setHistory([]);
    setScreen('Splash');
    setCertificateShared(false);
    setReportSaved(false);
  };
  const notice = (message: string) => Alert.alert('GreenMark demo', message);

  const shared = {
    goNext,
    goTo,
    restart,
    notice,
    businessName,
    setBusinessName,
    email,
    setEmail,
    businessType,
    setBusinessType,
    employees,
    setEmployees,
    city,
    setCity,
    revenue,
    setRevenue,
    electricity,
    setElectricity,
    lpg,
    setLpg,
    png,
    setPng,
    waste,
    setWaste,
    delivery,
    setDelivery,
    deliveryApp,
    setDeliveryApp,
    filter,
    setFilter,
    selectedProject,
    setSelectedProject,
    payment,
    setPayment,
    footprint,
    total,
    certificateShared,
    setCertificateShared,
    reportSaved,
    setReportSaved,
    badgeViews,
    setBadgeViews,
  };

  const showBottomNav = appScreens.includes(screen as typeof appScreens[number]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      <View style={styles.appShell}>
        {screen !== 'Splash' && (
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.iconButton} onPress={goBack} activeOpacity={0.75}>
              <Ionicons name="chevron-back" size={22} color={colors.tealDark} />
            </TouchableOpacity>
            <View style={styles.topTitleWrap}>
              <Text style={styles.topTitle}>{screen}</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
            </View>
          </View>
        )}
        <ScrollView
          contentContainerStyle={[styles.content, showBottomNav && styles.withNav]}
          showsVerticalScrollIndicator={false}
        >
          {renderScreen(screen, shared)}
        </ScrollView>
        {showBottomNav && <BottomNav active={screen} goTo={goTo} />}
      </View>
    </SafeAreaView>
  );
}

type SharedProps = {
  goNext: () => void;
  goTo: (target: ScreenName) => void;
  restart: () => void;
  notice: (message: string) => void;
  businessName: string;
  setBusinessName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  businessType: string;
  setBusinessType: (value: string) => void;
  employees: number;
  setEmployees: (value: number) => void;
  city: string;
  setCity: (value: string) => void;
  revenue: string;
  setRevenue: (value: string) => void;
  electricity: string;
  setElectricity: (value: string) => void;
  lpg: number;
  setLpg: (value: number) => void;
  png: boolean;
  setPng: (value: boolean) => void;
  waste: string;
  setWaste: (value: string) => void;
  delivery: boolean;
  setDelivery: (value: boolean) => void;
  deliveryApp: string;
  setDeliveryApp: (value: string) => void;
  filter: ProjectType;
  setFilter: (value: ProjectType) => void;
  selectedProject: Project;
  setSelectedProject: (value: Project) => void;
  payment: string;
  setPayment: (value: string) => void;
  footprint: number;
  total: number;
  certificateShared: boolean;
  setCertificateShared: (value: boolean) => void;
  reportSaved: boolean;
  setReportSaved: (value: boolean) => void;
  badgeViews: number;
  setBadgeViews: (value: number) => void;
};

function renderScreen(name: ScreenName, props: SharedProps) {
  switch (name) {
    case 'Splash':
      return <Splash {...props} />;
    case 'Sign Up':
      return <Signup {...props} />;
    case 'Login':
      return <Login {...props} />;
    case 'Business Type':
      return <BusinessType {...props} />;
    case 'Business Details':
      return <BusinessDetails {...props} />;
    case 'Electricity':
      return <Electricity {...props} />;
    case 'LPG':
      return <Lpg {...props} />;
    case 'Waste':
      return <Waste {...props} />;
    case 'Result':
      return <Result {...props} />;
    case 'Marketplace':
      return <Marketplace {...props} />;
    case 'Project Detail':
      return <ProjectDetail {...props} />;
    case 'Purchase':
      return <Purchase {...props} />;
    case 'Payment':
      return <Payment {...props} />;
    case 'Success':
      return <Success {...props} />;
    case 'Dashboard':
      return <Dashboard {...props} />;
    case 'Learn':
      return <Learn {...props} />;
    case 'Profile':
      return <Profile {...props} />;
  }
}

function Splash({ goTo }: SharedProps) {
  return (
    <View style={styles.heroScreen}>
      <View style={styles.logoRow}>
        <View style={styles.logoMark}>
          <MaterialCommunityIcons name="leaf" size={28} color={colors.white} />
        </View>
        <Text style={styles.logoText}>GreenMark</Text>
      </View>
      <View style={styles.illustration}>
        <View style={styles.sun} />
        <View style={styles.shop}>
          <View style={styles.awning} />
          <Text style={styles.shopText}>Eco Cafe</Text>
          <View style={styles.shopWindows}>
            <View style={styles.window} />
            <View style={styles.window} />
          </View>
        </View>
        <View style={styles.treeLeft} />
        <View style={styles.treeRight} />
      </View>
      <View style={styles.bottomHero}>
        <Text style={styles.h1}>Make Your Business Carbon Neutral</Text>
        <Text style={styles.bodyLarge}>
          Measure emissions, offset them with verified Indian projects, and share proof customers can trust.
        </Text>
        <PrimaryButton label="Get Started" onPress={() => goTo('Sign Up')} />
        <SecondaryButton label="I already have an account" onPress={() => goTo('Login')} />
      </View>
    </View>
  );
}

function Signup({ goTo, businessName, setBusinessName, email, setEmail }: SharedProps) {
  return (
    <ScreenIntro title="Create your GreenMark account" text="Start with the quickest setup. You can refine details later." icon="person-add-outline">
      <ActionTile icon="logo-google" title="Continue with Google" subtitle="Demo sign-in completes instantly" onPress={() => goTo('Business Type')} />
      <Divider />
      <Field label="Business Name" value={businessName} onChangeText={setBusinessName} />
      <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Field label="Password" value="greenmark123" secure />
      <Field label="Confirm Password" value="greenmark123" secure />
      <PrimaryButton label="Create Account" onPress={() => goTo('Business Type')} />
    </ScreenIntro>
  );
}

function Login({ goTo, email, setEmail }: SharedProps) {
  return (
    <ScreenIntro title="Welcome back" text="Pick up where your climate journey paused." icon="log-in-outline">
      <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Field label="Password" value="greenmark123" secure />
      <TouchableOpacity activeOpacity={0.75} onPress={() => goTo('Sign Up')}>
        <Text style={styles.linkText}>Need a new account?</Text>
      </TouchableOpacity>
      <PrimaryButton label="Login" onPress={() => goTo('Dashboard')} />
    </ScreenIntro>
  );
}

function BusinessType({ businessType, setBusinessType, goTo }: SharedProps) {
  return (
    <ScreenIntro title="What kind of business do you run?" text="This helps us estimate your footprint more accurately." icon="storefront-outline">
      <View style={styles.grid}>
        {businessTypes.map(([label, icon]) => (
          <TouchableOpacity
            key={label}
            style={[styles.choiceCard, businessType === label && styles.choiceCardActive]}
            onPress={() => setBusinessType(label)}
            activeOpacity={0.75}
          >
            <MaterialCommunityIcons name={icon} size={28} color={businessType === label ? colors.white : colors.tealDark} />
            <Text style={[styles.choiceText, businessType === label && styles.choiceTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <PrimaryButton label="Continue" onPress={() => goTo('Business Details')} />
    </ScreenIntro>
  );
}

function BusinessDetails(props: SharedProps) {
  const { businessName, setBusinessName, employees, setEmployees, city, setCity, revenue, setRevenue, goTo } = props;
  return (
    <ScreenIntro title="A few business details" text="Simple inputs only. No accounting spreadsheet energy here." icon="business-outline">
      <Field label="Business name" value={businessName} onChangeText={setBusinessName} />
      <Text style={styles.label}>City</Text>
      <ChipRow values={cities} selected={city} onSelect={setCity} />
      <Stepper label="Employees" value={employees} setValue={setEmployees} min={1} />
      <Text style={styles.label}>Revenue range</Text>
      <ChipRow values={revenueRanges} selected={revenue} onSelect={setRevenue} />
      <TrustNote text="Your data is private and never shared." />
      <PrimaryButton label="Continue" onPress={() => goTo('Electricity')} />
    </ScreenIntro>
  );
}

function Electricity({ electricity, setElectricity, businessType, goTo }: SharedProps) {
  return (
    <ScreenIntro title="Monthly electricity use" text="Add your bill units or use a typical estimate for your business." icon="flash-outline">
      <Field label="Electricity units" value={electricity} onChangeText={setElectricity} helper={`Typical ${businessType.toLowerCase()} uses 400-800 units per month`} keyboardType="number-pad" />
      <ActionTile icon="sparkles-outline" title="Use average" subtitle="Estimate from business type and team size" onPress={() => setElectricity('620')} />
      <PrimaryButton label="Continue" onPress={() => goTo('LPG')} />
    </ScreenIntro>
  );
}

function Lpg({ lpg, setLpg, png, setPng, goTo }: SharedProps) {
  return (
    <ScreenIntro title="Cooking fuel" text="Tell us how much LPG or PNG your kitchen uses." icon="flame-outline">
      <Stepper label="LPG cylinders per month" value={lpg} setValue={setLpg} min={0} />
      <Toggle label="Do you use PNG?" value={png} setValue={setPng} />
      <PrimaryButton label="Continue" onPress={() => goTo('Waste')} />
    </ScreenIntro>
  );
}

function Waste(props: SharedProps) {
  const { waste, setWaste, delivery, setDelivery, deliveryApp, setDeliveryApp, goTo } = props;
  return (
    <ScreenIntro title="Waste and delivery" text="Last step. Choose what best matches a normal day." icon="bicycle-outline">
      <Text style={styles.label}>Daily food waste</Text>
      <ChipRow values={wasteRanges} selected={waste} onSelect={setWaste} />
      <Toggle label="Do you offer delivery?" value={delivery} setValue={setDelivery} />
      {delivery && (
        <>
          <Text style={styles.label}>Delivery channels</Text>
          <ChipRow values={deliveryApps} selected={deliveryApp} onSelect={setDeliveryApp} />
        </>
      )}
      <PrimaryButton label="Calculate My Footprint" onPress={() => goTo('Result')} />
    </ScreenIntro>
  );
}

function Result({ footprint, city, goTo, setReportSaved, notice }: SharedProps) {
  return (
    <ScreenIntro title="Your estimated footprint" text="A clear yearly number you can act on today." icon="analytics-outline">
      <View style={styles.resultCard}>
        <Text style={styles.bigNumber}>{footprint}</Text>
        <Text style={styles.tons}>tons CO2/year</Text>
        <View style={styles.gauge}>
          <View style={[styles.gaugeFill, { width: `${Math.min(88, Math.max(22, footprint * 7))}%` }]} />
        </View>
        <Text style={styles.comparison}>12% less than similar cafes in {city}</Text>
      </View>
      <PrimaryButton label="Offset My Emissions" onPress={() => goTo('Marketplace')} />
      <SecondaryButton
        label="Save Report"
        onPress={() => {
          setReportSaved(true);
          notice('Demo report saved to your dashboard.');
        }}
      />
    </ScreenIntro>
  );
}

function Marketplace({ filter, setFilter, setSelectedProject, goTo }: SharedProps) {
  const visible = projects.filter((project) => project.type === filter);
  return (
    <ScreenIntro title="Choose verified offsets" text="Support real projects with simple pricing and proof." icon="leaf-outline">
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color={colors.muted} />
        <Text style={styles.searchText}>Search projects</Text>
      </View>
      <ChipRow values={filters} selected={filter} onSelect={setFilter} />
      {(visible.length ? visible : projects).map((project) => (
        <ProjectCard
          key={project.title}
          project={project}
          onPress={() => {
            setSelectedProject(project);
            goTo('Project Detail');
          }}
        />
      ))}
    </ScreenIntro>
  );
}

function ProjectDetail({ selectedProject, goTo }: SharedProps) {
  return (
    <ScreenIntro title={selectedProject.title} text="Verified project with measurable climate and community impact." icon={selectedProject.icon} community>
      <View style={[styles.projectHero, { backgroundColor: selectedProject.color }]}>
        <MaterialCommunityIcons name={selectedProject.icon} size={74} color={colors.tealDark} />
      </View>
      <View style={styles.statsGrid}>
        <MiniStat label="CO2 offset" value="1,240t" />
        <MiniStat label="Families" value="420" />
        <MiniStat label="Running" value="6 yrs" />
      </View>
      <Text style={styles.paragraph}>This project reduces emissions through locally managed action and issues verified credits after impact checks.</Text>
      <PrimaryButton label="Select This Project" onPress={() => goTo('Purchase')} />
    </ScreenIntro>
  );
}

function Purchase({ footprint, selectedProject, total, goTo }: SharedProps) {
  return (
    <ScreenIntro title="Purchase credits" text="We matched credits to your estimated yearly footprint." icon="cart-outline">
      <PriceRow label="Credits needed" value={`${footprint} tons`} />
      <PriceRow label="Rate" value={`INR ${selectedProject.price} / ton`} />
      <PriceRow label="Platform fee" value="INR 299" />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>INR {total.toLocaleString('en-IN')}</Text>
      </View>
      <TrustNote text="Secure payment. Certificate issued instantly in demo mode." />
      <PrimaryButton label="Proceed to Payment" onPress={() => goTo('Payment')} />
    </ScreenIntro>
  );
}

function Payment({ payment, setPayment, total, goTo }: SharedProps) {
  return (
    <ScreenIntro title="Pay securely" text="UPI is selected by default for fast checkout." icon="shield-checkmark-outline">
      <Text style={styles.label}>UPI app</Text>
      <ChipRow values={['GPay', 'PhonePe', 'Paytm']} selected={payment} onSelect={setPayment} />
      <Field label="UPI ID" value="freshleaf@okaxis" />
      <TrustNote text="Demo payment. No real money is charged." />
      <PrimaryButton label={`Pay INR ${total.toLocaleString('en-IN')}`} onPress={() => goTo('Success')} />
    </ScreenIntro>
  );
}

function Success(props: SharedProps) {
  const { goTo, businessName, footprint, selectedProject, setCertificateShared, certificateShared, notice } = props;
  return (
    <ScreenIntro title="You are carbon neutral" text="Your certificate is ready to share with customers." icon="checkmark-circle-outline">
      <Certificate businessName={businessName} footprint={footprint} project={selectedProject.title} />
      <PrimaryButton
        label={certificateShared ? 'Certificate Shared' : 'Share Certificate'}
        onPress={() => {
          setCertificateShared(true);
          notice('Demo certificate shared with customers.');
        }}
        icon="share-social-outline"
      />
      <SecondaryButton label="Download Demo Certificate" onPress={() => notice('Demo certificate downloaded.')} icon="download-outline" />
      <SecondaryButton label="Go to Dashboard" onPress={() => goTo('Dashboard')} />
    </ScreenIntro>
  );
}

function Dashboard(props: SharedProps) {
  const { goTo, businessName, footprint, certificateShared, reportSaved, badgeViews, setBadgeViews, notice } = props;
  return (
    <ScreenIntro title={`Good morning, ${businessName}`} text="Your climate proof is active and ready for customers." icon="home-outline">
      <View style={styles.statsGrid}>
        <MiniStat label="Trees equivalent" value={`${Math.round(footprint * 46)}`} />
        <MiniStat label="Energy saved" value="9.2 MWh" />
        <MiniStat label="Families helped" value="42" />
      </View>
      <SectionTitle title="Quick actions" />
      <View style={styles.quickGrid}>
        <ActionTile
          icon="qr-code-outline"
          title="Show badge"
          subtitle="Display at billing counter"
          compact
          onPress={() => {
            setBadgeViews(badgeViews + 1);
            notice('Customer badge opened.');
          }}
        />
        <ActionTile icon="document-text-outline" title="View report" subtitle="Monthly footprint summary" compact onPress={() => goTo('Result')} />
      </View>
      <SectionTitle title="Recent activity" />
      <Activity text={certificateShared ? 'Certificate shared on WhatsApp' : 'Certificate ready to share'} time="Today" />
      <Activity text={`${footprint} credits purchased`} time="Yesterday" />
      {reportSaved && <Activity text="Footprint report saved" time="This week" />}
    </ScreenIntro>
  );
}

function Learn(_props: SharedProps) {
  return (
    <ScreenIntro title="Learn" text="Short explainers for busy business owners." icon="book-outline">
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color={colors.muted} />
        <Text style={styles.searchText}>Search guides</Text>
      </View>
      <ChipRow values={['Basics', 'Carbon credits', 'Policy']} selected="Basics" onSelect={() => {}} />
      {articles.map(([tag, title]) => (
        <TouchableOpacity style={styles.articleCard} key={title} activeOpacity={0.75}>
          <Text style={styles.badge}>{tag}</Text>
          <Text style={styles.articleTitle}>{title}</Text>
          <Text style={styles.articleText}>A 3-minute read with practical examples for Indian cafes and kitchens.</Text>
        </TouchableOpacity>
      ))}
    </ScreenIntro>
  );
}

function Profile(props: SharedProps) {
  const { businessName, city, businessType, footprint, badgeViews, goTo, restart, notice } = props;
  return (
    <ScreenIntro title="Account" text="Manage business details, certificates, and payment settings." icon="person-circle-outline">
      <View style={styles.profileCard}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{initials(businessName)}</Text></View>
        <View style={styles.profileCopy}>
          <Text style={styles.profileName}>{businessName}</Text>
          <Text style={styles.profileMeta}>{city} - {businessType} - Carbon neutral</Text>
        </View>
      </View>
      <View style={styles.statsGrid}>
        <MiniStat label="Credits" value={`${footprint}`} />
        <MiniStat label="Certificates" value="1" />
        <MiniStat label="Badge views" value={`${badgeViews}`} />
      </View>
      <OptionRow label="Payment methods" onPress={() => goTo('Payment')} />
      <OptionRow label="Certificates" onPress={() => goTo('Success')} />
      <OptionRow label="Business settings" onPress={() => goTo('Business Details')} />
      <OptionRow label="Logout" onPress={() => {
        notice('Logged out of the demo account.');
        restart();
      }} />
    </ScreenIntro>
  );
}

function ScreenIntro({
  title,
  text,
  icon,
  community = false,
  children,
}: {
  title: string;
  text: string;
  icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
  community?: boolean;
  children: React.ReactNode;
}) {
  return (
    <View>
      <View style={styles.headerIcon}>
        {community ? (
          <MaterialCommunityIcons name={icon as keyof typeof MaterialCommunityIcons.glyphMap} size={28} color={colors.tealDark} />
        ) : (
          <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={28} color={colors.tealDark} />
        )}
      </View>
      <Text style={styles.h2}>{title}</Text>
      <Text style={styles.body}>{text}</Text>
      <View style={styles.stack}>{children}</View>
    </View>
  );
}

function PrimaryButton({ label, onPress, icon }: { label: string; onPress: () => void; icon?: keyof typeof Ionicons.glyphMap }) {
  return (
    <TouchableOpacity style={styles.primaryButton} onPress={onPress} activeOpacity={0.78}>
      {icon && <Ionicons name={icon} size={20} color={colors.white} />}
      <Text style={styles.primaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

function SecondaryButton({ label, onPress, icon }: { label: string; onPress: () => void; icon?: keyof typeof Ionicons.glyphMap }) {
  return (
    <TouchableOpacity style={styles.secondaryButton} onPress={onPress} activeOpacity={0.78}>
      {icon && <Ionicons name={icon} size={20} color={colors.tealDark} />}
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

function Field({
  label,
  value,
  helper,
  secure = false,
  keyboardType,
  onChangeText,
}: {
  label: string;
  value: string;
  helper?: string;
  secure?: boolean;
  keyboardType?: 'default' | 'email-address' | 'number-pad';
  onChangeText?: (value: string) => void;
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        placeholderTextColor={colors.muted}
      />
      {helper && <Text style={styles.helper}>{helper}</Text>}
    </View>
  );
}

function ChipRow<T extends string>({ values, selected, onSelect }: { values: readonly T[]; selected: string; onSelect: (value: T) => void }) {
  return (
    <View style={styles.chipRow}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          style={[styles.chip, selected === value && styles.chipActive]}
          onPress={() => onSelect(value)}
          activeOpacity={0.75}
        >
          <Text style={[styles.chipText, selected === value && styles.chipTextActive]}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function Stepper({ label, value, setValue, min = 0 }: { label: string; value: number; setValue: (value: number) => void; min?: number }) {
  return (
    <View style={styles.stepperWrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.stepper}>
        <TouchableOpacity style={styles.stepButton} onPress={() => setValue(Math.max(min, value - 1))}>
          <Ionicons name="remove" size={22} color={colors.tealDark} />
        </TouchableOpacity>
        <Text style={styles.stepValue}>{value}</Text>
        <TouchableOpacity style={styles.stepButton} onPress={() => setValue(value + 1)}>
          <Ionicons name="add" size={22} color={colors.tealDark} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Toggle({ label, value, setValue }: { label: string; value: boolean; setValue: (value: boolean) => void }) {
  return (
    <TouchableOpacity style={styles.toggleRow} onPress={() => setValue(!value)} activeOpacity={0.75}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <View style={[styles.toggle, value && styles.toggleActive]}>
        <View style={[styles.toggleKnob, value && styles.toggleKnobActive]} />
      </View>
    </TouchableOpacity>
  );
}

function ActionTile({
  icon,
  title,
  subtitle,
  compact = false,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  compact?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={[styles.actionTile, compact && styles.actionTileCompact]} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.tileIcon}>
        <Ionicons name={icon} size={22} color={colors.tealDark} />
      </View>
      <View style={styles.tileCopy}>
        <Text style={styles.tileTitle}>{title}</Text>
        <Text style={styles.tileSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

function ProjectCard({ project, onPress }: { project: Project; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.projectCard} onPress={onPress} activeOpacity={0.75}>
      <View style={[styles.projectImage, { backgroundColor: project.color }]}>
        <MaterialCommunityIcons name={project.icon} size={36} color={colors.tealDark} />
      </View>
      <View style={styles.projectCopy}>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>Verified by Verra</Text>
        </View>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <Text style={styles.projectMeta}>{project.location} - INR {project.price} / ton</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </TouchableOpacity>
  );
}

function Certificate({ businessName, footprint, project }: { businessName: string; footprint: number; project: string }) {
  return (
    <View style={styles.certificate}>
      <Text style={styles.certSmall}>GREENMARK CERTIFICATE</Text>
      <Text style={styles.certTitle}>{businessName}</Text>
      <Text style={styles.certText}>has offset {footprint} tons CO2e through verified climate credits from {project}.</Text>
      <Text style={styles.certId}>ID GM-IN-2026-0842</Text>
    </View>
  );
}

function TrustNote({ text }: { text: string }) {
  return (
    <View style={styles.trustNote}>
      <Ionicons name="lock-closed-outline" size={18} color={colors.tealDark} />
      <Text style={styles.trustText}>{text}</Text>
    </View>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.miniStat}>
      <Text style={styles.miniValue}>{value}</Text>
      <Text style={styles.miniLabel}>{label}</Text>
    </View>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.priceRow}>
      <Text style={styles.priceLabel}>{label}</Text>
      <Text style={styles.priceValue}>{value}</Text>
    </View>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function Activity({ text, time }: { text: string; time: string }) {
  return (
    <View style={styles.activity}>
      <View style={styles.activityDot} />
      <Text style={styles.activityText}>{text}</Text>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  );
}

function OptionRow({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.optionRow} onPress={onPress} activeOpacity={0.75}>
      <Text style={styles.optionText}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </TouchableOpacity>
  );
}

function Divider() {
  return (
    <View style={styles.divider}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>or</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

function BottomNav({ active, goTo }: { active: ScreenName; goTo: (target: ScreenName) => void }) {
  const items: Array<[ScreenName, string, keyof typeof Ionicons.glyphMap]> = [
    ['Dashboard', 'Home', 'home-outline'],
    ['Marketplace', 'Offset', 'leaf-outline'],
    ['Result', 'Impact', 'bar-chart-outline'],
    ['Success', 'Proof', 'ribbon-outline'],
    ['Profile', 'Account', 'person-outline'],
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map(([target, label, icon]) => {
        const isActive = active === target || (label === 'Impact' && active === 'Result');
        return (
          <TouchableOpacity key={label} style={styles.navItem} onPress={() => goTo(target)} activeOpacity={0.75}>
            <Ionicons name={icon} size={22} color={isActive ? colors.green : colors.muted} />
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  appShell: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    padding: 20,
    paddingBottom: 28,
  },
  withNav: {
    paddingBottom: 112,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: colors.surface,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.line,
  },
  topTitleWrap: {
    flex: 1,
  },
  topTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 8,
  },
  progressTrack: {
    height: 5,
    backgroundColor: colors.line,
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressFill: {
    height: 5,
    backgroundColor: colors.green,
    borderRadius: 99,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoMark: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.tealDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.tealDark,
  },
  heroScreen: {
    minHeight: 760,
    justifyContent: 'space-between',
  },
  illustration: {
    height: 330,
    marginVertical: 28,
    backgroundColor: colors.tealLight,
    borderRadius: 28,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 38,
  },
  sun: {
    position: 'absolute',
    top: 34,
    right: 42,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.marigold,
  },
  shop: {
    width: 210,
    height: 160,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    paddingTop: 44,
  },
  awning: {
    position: 'absolute',
    top: 0,
    width: 230,
    height: 34,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: colors.green,
  },
  shopText: {
    color: colors.tealDark,
    fontSize: 20,
    fontWeight: '900',
  },
  shopWindows: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
  window: {
    width: 48,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.tealLight,
  },
  treeLeft: {
    position: 'absolute',
    left: 32,
    bottom: 34,
    width: 52,
    height: 72,
    borderRadius: 28,
    backgroundColor: '#9FE3C8',
  },
  treeRight: {
    position: 'absolute',
    right: 28,
    bottom: 40,
    width: 46,
    height: 62,
    borderRadius: 24,
    backgroundColor: '#8ADCBF',
  },
  bottomHero: {
    gap: 14,
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  h1: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
    color: colors.ink,
  },
  h2: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    color: colors.ink,
    marginBottom: 8,
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.muted,
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.muted,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
  },
  stack: {
    marginTop: 24,
    gap: 16,
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    shadowColor: colors.green,
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  secondaryButton: {
    minHeight: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    color: colors.tealDark,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 8,
  },
  input: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 16,
    color: colors.ink,
    fontSize: 15,
    fontWeight: '600',
  },
  helper: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  linkText: {
    alignSelf: 'flex-end',
    color: colors.tealDark,
    fontSize: 14,
    fontWeight: '800',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.line,
  },
  dividerText: {
    color: colors.muted,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  choiceCard: {
    width: '47%',
    minHeight: 118,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
    justifyContent: 'space-between',
  },
  choiceCardActive: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  choiceText: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.ink,
  },
  choiceTextActive: {
    color: colors.white,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    minHeight: 42,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: colors.tealDark,
    borderColor: colors.tealDark,
  },
  chipText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '800',
  },
  chipTextActive: {
    color: colors.white,
  },
  stepperWrap: {
    gap: 8,
  },
  stepper: {
    minHeight: 62,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  stepButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.ink,
  },
  toggleRow: {
    minHeight: 62,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabel: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800',
  },
  toggle: {
    width: 54,
    height: 32,
    borderRadius: 99,
    backgroundColor: colors.line,
    padding: 3,
  },
  toggleActive: {
    backgroundColor: colors.green,
  },
  toggleKnob: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.white,
  },
  toggleKnobActive: {
    transform: [{ translateX: 22 }],
  },
  actionTile: {
    minHeight: 78,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionTileCompact: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  tileIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileCopy: {
    flex: 1,
  },
  tileTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.ink,
  },
  tileSubtitle: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 17,
    color: colors.muted,
  },
  trustNote: {
    minHeight: 48,
    borderRadius: 15,
    backgroundColor: colors.tealLight,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  trustText: {
    color: colors.tealDark,
    fontWeight: '800',
    flex: 1,
    fontSize: 12,
  },
  resultCard: {
    borderRadius: 24,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 24,
    alignItems: 'center',
  },
  bigNumber: {
    fontSize: 72,
    lineHeight: 78,
    fontWeight: '900',
    color: colors.tealDark,
  },
  tons: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.ink,
  },
  gauge: {
    width: '100%',
    height: 12,
    borderRadius: 99,
    marginVertical: 22,
    backgroundColor: colors.line,
    overflow: 'hidden',
  },
  gaugeFill: {
    height: 12,
    borderRadius: 99,
    backgroundColor: colors.marigold,
  },
  comparison: {
    color: colors.tealDark,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  searchBox: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },
  searchText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
  },
  projectCard: {
    minHeight: 118,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  projectImage: {
    width: 78,
    height: 86,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectCopy: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
  },
  badge: {
    alignSelf: 'flex-start',
    color: colors.tealDark,
    backgroundColor: colors.tealLight,
    borderRadius: 999,
    overflow: 'hidden',
    paddingHorizontal: 9,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: '900',
  },
  projectTitle: {
    marginTop: 8,
    color: colors.ink,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '900',
  },
  projectMeta: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  projectHero: {
    height: 190,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  miniStat: {
    flex: 1,
    minHeight: 86,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 12,
    justifyContent: 'center',
  },
  miniValue: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.tealDark,
  },
  miniLabel: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 15,
    color: colors.muted,
    fontWeight: '700',
  },
  priceRow: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
  },
  priceValue: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900',
  },
  totalRow: {
    minHeight: 68,
    borderRadius: 18,
    backgroundColor: colors.tealDark,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
  totalValue: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
  },
  certificate: {
    minHeight: 240,
    borderRadius: 24,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.green,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  certSmall: {
    color: colors.tealDark,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  certTitle: {
    marginTop: 16,
    color: colors.ink,
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
  },
  certText: {
    marginTop: 10,
    color: colors.muted,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
  },
  certId: {
    marginTop: 18,
    color: colors.tealDark,
    fontSize: 12,
    fontWeight: '900',
  },
  sectionTitle: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '900',
    color: colors.ink,
  },
  activity: {
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  activityDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.green,
  },
  activityText: {
    flex: 1,
    color: colors.ink,
    fontSize: 13,
    fontWeight: '800',
  },
  activityTime: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  articleCard: {
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
  },
  articleTitle: {
    marginTop: 12,
    color: colors.ink,
    fontSize: 16,
    fontWeight: '900',
  },
  articleText: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  profileCard: {
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.tealDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  profileCopy: {
    flex: 1,
  },
  profileName: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '900',
  },
  profileMeta: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  optionRow: {
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800',
  },
  bottomNav: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 12,
    minHeight: 72,
    borderRadius: 22,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
  },
  navLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '800',
  },
  navLabelActive: {
    color: colors.green,
  },
});
