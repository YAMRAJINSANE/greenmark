import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDERS } from '../../theme';
import { Button, Input, Card, ScreenContainer } from '../../components';
import { DUMMY_PAYMENT_METHODS } from '../../data/dummy';

interface PaymentScreenProps {
  amount: number;
  onPaymentSuccess: (transactionId: string) => void;
  onBack: () => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  amount,
  onPaymentSuccess,
  onBack,
}) => {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('rajesh@okhdfcbank');
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    // Simulate dummy payment API call
    setTimeout(() => {
      // Generate dummy transaction ID
      const transactionId = `TXN-${Date.now()}`;
      onPaymentSuccess(transactionId);
      setLoading(false);
    }, 2000);
  };

  const renderPaymentMethod = (method: typeof DUMMY_PAYMENT_METHODS[0]) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.methodCard,
        selectedMethod === method.id && styles.methodCardSelected,
      ]}
      onPress={() => setSelectedMethod(method.id)}
    >
      <View style={styles.methodIcon}>{method.icon}</View>
      <View style={styles.methodInfo}>
        <Text style={[
          styles.methodName,
          selectedMethod === method.id && styles.methodNameSelected,
        ]}>
          {method.name}
        </Text>
        {method.default && (
          <Text style={styles.methodDefault}>Recommended</Text>
        )}
      </View>
      <View style={[
        styles.methodCheckbox,
        selectedMethod === method.id && styles.methodCheckboxSelected,
      ]}>
        {selectedMethod === method.id && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer scrollable style={styles.container}>
      {/* Back Button */}
      <Button
        label="← Back"
        onPress={onBack}
        variant="outline"
        size="small"
        style={styles.backButton}
      />

      {/* Amount */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Amount to Pay</Text>
        <Text style={styles.amount}>₹{amount}</Text>
      </View>

      {/* Payment Methods */}
      <Text style={styles.sectionTitle}>Select Payment Method</Text>
      <View style={styles.methodsContainer}>
        {DUMMY_PAYMENT_METHODS.map(renderPaymentMethod)}
      </View>

      {/* UPI Input */}
      {selectedMethod === 'upi' && (
        <View style={styles.upiInputContainer}>
          <Input
            label="UPI ID"
            placeholder="yourname@bank"
            value={upiId}
            onChangeText={setUpiId}
            prefix="₹"
          />
        </View>
      )}

      {/* Security Info */}
      <Card variant="outlined" style={styles.securityCard}>
        <Text style={styles.securityTitle}>🔒 Secure Payment</Text>
        <Text style={styles.securityText}>
          256-bit encrypted. Your payment information is safe.
        </Text>
        <Text style={styles.poweredBy}>Powered by Razorpay</Text>
      </Card>

      {/* CTA */}
      <Button
        label={`Pay ₹${amount}`}
        onPress={handlePay}
        loading={loading}
        fullWidth
        style={styles.payButton}
      />

      <Text style={styles.disclaimer}>
        By clicking Pay, you authorize the transaction. Check your bank for confirmation.
      </Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: SPACING.lg,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral200,
  },
  amountLabel: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.sm,
  },
  amount: {
    fontSize: TYPOGRAPHY.sizes.huge,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fonts.sora,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.md,
  },
  methodsContainer: {
    marginBottom: SPACING.lg,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: BORDERS.radius.md,
    borderWidth: 2,
    borderColor: COLORS.neutral300,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.white,
  },
  methodCardSelected: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.successLight,
  },
  methodIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.xs,
  },
  methodNameSelected: {
    color: COLORS.success,
  },
  methodDefault: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.success,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  methodCheckbox: {
    width: 24,
    height: 24,
    borderRadius: BORDERS.radius.full,
    borderWidth: 2,
    borderColor: COLORS.neutral400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodCheckboxSelected: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  upiInputContainer: {
    marginBottom: SPACING.lg,
  },
  securityCard: {
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.infoLight,
  },
  securityTitle: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.info,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.sm,
  },
  securityText: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.info,
    fontFamily: TYPOGRAPHY.fonts.inter,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  poweredBy: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.info,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  payButton: {
    marginBottom: SPACING.lg,
  },
  disclaimer: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default PaymentScreen;
